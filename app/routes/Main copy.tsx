import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import the router
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../components/Footer";

const calculateCyclePhase = (
  lastPeriodDateStr: string,
  cycleLength: number = 28
) => {
  if (!lastPeriodDateStr) {
    return { phase: "Unknown", day: 0 };
  }
  const lastPeriodDate = new Date(lastPeriodDateStr);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastPeriodDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const currentDayOfCycle = diffDays % cycleLength || cycleLength;
  const menstrualEnd = 5;
  const follicularEnd = 13;
  const ovulationEnd = 15;
  if (currentDayOfCycle <= menstrualEnd) {
    return { phase: "Menstrual Phase", day: currentDayOfCycle };
  } else if (currentDayOfCycle <= follicularEnd) {
    return {
      phase: "Follicular Phase",
      day: currentDayOfCycle - menstrualEnd,
    };
  } else if (currentDayOfCycle <= ovulationEnd) {
    return { phase: "Ovulation", day: currentDayOfCycle - follicularEnd };
  } else {
    return { phase: "Luteal Phase", day: currentDayOfCycle - ovulationEnd };
  }
};

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDayShort(year: number, month: number, day: number) {
  const date = new Date(year, month, day);
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
}

function getCurrentWeekDates() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MainScreen() {
  const router = useRouter(); // Initialize the router

  const [status, setStatus] = useState("loading"); // 'loading', 'error', 'success'
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phase: "",
    phaseDay: 0,
    lastPeriod: "",
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; // Sidebar width is 250
  const symptoms = "Tired"; // This can also be fetched if stored
  console.log("mainpage");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          router.replace("/Login");
          return;
        }
        // Fetch user profile
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (!userDoc.exists()) {
          router.replace("/Home");
          return;
        }
        const userProfile = userDoc.data();
        let tries = 0;
        let questionnaireDoc;
        while (
          tries < 10 &&
          (!questionnaireDoc || !questionnaireDoc.exists())
        ) {
          questionnaireDoc = await getDoc(doc(db, "questionnaires", user.uid));
          tries++;
          if (!questionnaireDoc.exists()) {
            console.log("questionnaire not found, retrying in 300ms");
            await new Promise((r) => setTimeout(r, 300));
          }
        }
        if (!questionnaireDoc || !questionnaireDoc.exists()) {
          router.replace("/Home");
          return;
        }
        const questionnaire = questionnaireDoc.data();
        const lastPeriod = questionnaire.answers[3]; // index 3 for lastPeriod
        const cycleRegularity = parseInt(questionnaire.answers[5]) || 28; // index 5 for cycleRegularity
        const cycleInfo = calculateCyclePhase(lastPeriod, cycleRegularity);
        setUserData({
          name: userProfile.fullName || "User",
          phase: cycleInfo.phase,
          phaseDay: cycleInfo.day,
          lastPeriod: lastPeriod,
        });
        setStatus("success");
      } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        console.error("Failed to load user data:", err);
        setErrorMessage(message);
        setStatus("error");
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [sidebarVisible]);

  if (status === "loading") {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#655950" />
        <Text>Loading your data...</Text>
      </SafeAreaView>
    );
  }
  if (status === "error") {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text>Error: {errorMessage}</Text>
        <Text>Please try logging in again.</Text>
      </SafeAreaView>
    );
  }
  if (status === "success") {
    // Get current date info
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const todayDate = today.getDate();
    const weekDates = getCurrentWeekDates();
    return (
      <SafeAreaView style={styles.container}>
        {/* Sidebar Modal */}
        <Modal
          visible={sidebarVisible}
          animationType="none"
          transparent={true}
          onRequestClose={() => setSidebarVisible(false)}
        >
          <Pressable
            style={styles.sidebarOverlay}
            onPress={() => setSidebarVisible(false)}
          >
            <Animated.View
              style={[
                styles.sidebar,
                { transform: [{ translateX: slideAnim }] },
              ]}
            >
              <TouchableOpacity
                style={styles.sidebarCloseIcon}
                onPress={() => setSidebarVisible(false)}
              >
                <AntDesign name="close" size={24} color="#333" />
              </TouchableOpacity>
              <View style={styles.sidebarProfileCircle}>
                <Text style={styles.sidebarProfileInitial}>
                  {userData.name[0]}
                </Text>
              </View>
              <Text style={styles.sidebarName}>{userData.name}</Text>
              <TouchableOpacity
                style={styles.sidebarLogoutButton}
                onPress={async () => {
                  await auth.signOut();
                  setSidebarVisible(false);
                  router.replace("/Login");
                }}
              >
                <Text style={styles.sidebarLogoutText}>Logout</Text>
              </TouchableOpacity>
            </Animated.View>
          </Pressable>
        </Modal>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerRow}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                <View style={styles.profileCircle}>
                  <Text style={styles.profileInitial}>{userData.name[0]}</Text>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: "column" }}>
                <Text style={styles.headerText}>Hello, {userData.name}</Text>
                <Text style={{ fontSize: 24 }}>Have a nice day!</Text>
              </View>
            </View>
            <Ionicons name="notifications-outline" size={30} color="black" />
          </View>

          <View style={styles.monthRow}>
            <Text style={styles.monthText}>
              {MONTH_NAMES[currentMonth]} {currentYear}
            </Text>
            <Ionicons name="chevron-down" size={20} />
          </View>

          <View style={styles.calendarRow}>
            {weekDates.map((date, index) => {
              const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
              let dayCount = null;
              let isPassed = false;
              let isAfterLastPeriod = false;
              if (userData.lastPeriod) {
                const lastPeriodDate = new Date(userData.lastPeriod);
                const diff = Math.floor(
                  (date.getTime() - lastPeriodDate.getTime()) /
                    (1000 * 60 * 60 * 24)
                );
                if (diff >= 0 && date <= today) {
                  dayCount = diff + 1;
                  isAfterLastPeriod = true;
                }
                if (date < today && date >= lastPeriodDate) {
                  isPassed = true;
                }
              }
              return (
                <View key={index} style={{ alignItems: "center" }}>
                  <View
                    style={[
                      styles.calendarDay,
                      isToday && styles.todayCalendarDay,
                      isPassed && styles.passedCalendarDay,
                    ]}
                  >
                    <View style={{ position: "relative" }}>
                      {dayCount && (
                        <Text style={styles.calendarDayCount}>{dayCount}</Text>
                      )}
                    </View>
                    <Text
                      style={[
                        styles.calendarDayText,
                        isToday && styles.todayCalendarDayText,
                        isPassed && styles.passedCalendarDayText,
                      ]}
                    >
                      {date.getDate()}
                    </Text>
                  </View>
                  <Text style={styles.calendarDayOfWeek}>
                    {WEEK_DAYS[date.getDay()]}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.inputButton}>
              <Text style={styles.inputButtonText}>Input Cycle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputButton}>
              <Ionicons name="sad-outline" size={16} color="black" />
              <Text style={styles.inputButtonText}> {symptoms}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.phaseContainer}>
            <View style={styles.phaseCircle}>
              <Text style={styles.phaseText}>
                {userData.phase}
                {"\n"}DAY {userData.phaseDay}
              </Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            <View style={[styles.card, styles.orangeCard]}>
              <Text style={styles.cardTitle}>🍽️ DIET</Text>
              <Text style={styles.cardText}>
                Take more magnesium-rich foods or supplements, avoid salty food.
                Add complex carbs and healthy fats.
              </Text>
            </View>
            <View style={[styles.card, styles.yellowCard]}>
              <Text style={styles.cardTitle}>🏃 FITNESS</Text>
              <Text style={styles.cardText}>
                Engage in light activities like yoga, stretching or walking to
                help ease cramps and boost your mood during your period.
              </Text>
            </View>
            <View style={[styles.card, styles.greenCard]}>
              <Text style={styles.cardTitle}>😊 MOOD</Text>
              <Text style={styles.cardText}>
                Do activities you enjoy, like listening or watching something
                you like to feel better during your period.
              </Text>
            </View>
            <View style={[styles.card, styles.pinkCard]}>
              <Text style={styles.cardTitle}>💼 PRODUCTIVITY</Text>
              <Text style={styles.cardText}>
                Prioritize tasks and focus on smaller, manageable goals to stay
                productive while honoring your body{"'"}s needs during your
                period.
              </Text>
            </View>
          </View>
        </ScrollView>

        <Footer />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEFDE9",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
  },
  monthRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 15,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  activeCalendarDay: {
    backgroundColor: "#e75480",
  },
  calendarDayText: {
    color: "black",
  },
  activeCalendarDayText: {
    color: "white",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  inputButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2,
  },
  inputButtonText: {
    color: "black",
    fontSize: 14,
  },
  phaseContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  phaseCircle: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: "rgba(133, 82, 239, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  phaseText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  cardsContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  orangeCard: {
    backgroundColor: "#ffe5b4",
  },
  yellowCard: {
    backgroundColor: "#fff9c4",
  },
  greenCard: {
    backgroundColor: "#d0f0c0",
  },
  pinkCard: {
    backgroundColor: "#f8c8dc",
  },
  cardTitle: {
    fontWeight: "700",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 18,
  },
  profileCircle: {
    width: 46,
    height: 46,
    borderRadius: 50,
    backgroundColor: "#a01aa0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sidebarOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  sidebar: {
    width: 250,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: "center",
    height: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  sidebarProfileCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#a01aa0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  sidebarProfileInitial: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  sidebarName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#333",
  },
  sidebarLogoutButton: {
    backgroundColor: "#EAA4FA",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  sidebarLogoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sidebarCloseIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  calendarDayOfWeek: {
    fontSize: 10,
    color: "black",
    textAlign: "center",
    marginTop: 2,
  },
  calendarDayCount: {
    position: "absolute",
    top: -16,
    height: 20,
    width: 20,
    right: -20,
    fontSize: 10,
    color: "#fff",
    backgroundColor: "rgba(226, 58, 172, 1)",
    borderRadius: 10,
    paddingHorizontal: 4,
    fontWeight: "bold",
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
  },
  passedCalendarDay: {
    backgroundColor: "#f5cee9",
    borderColor: "rgba(226, 58, 172, 1)",
  },
  passedCalendarDayText: {
    color: "rgba(226, 58, 172, 1)",
  },
  todayCalendarDay: {
    backgroundColor: "rgba(226, 58, 172, 0.72)",
  },
  todayCalendarDayText: {
    color: "white",
    fontWeight: "bold",
  },
});
