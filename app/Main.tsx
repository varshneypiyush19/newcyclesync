import {
  AntDesign,
  EvilIcons,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import the router
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const calculateCyclePhase = (
  lastPeriodDateStr: string,
  cycleLength: number = 28
) => {
  if (!lastPeriodDateStr) {
    return { phase: "Menstrual", day: 1 };
  }
  const lastPeriodDate = new Date(lastPeriodDateStr);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - lastPeriodDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const currentDayOfCycle = diffDays % cycleLength || cycleLength;
  const menstrualEnd = 5;
  const follicularEnd = 13;
  const ovulationEnd = 16;
  if (currentDayOfCycle <= menstrualEnd) {
    return {
      phase: "Menstrual Phase",
      day: currentDayOfCycle,
      color: "#993341",
      colorLight: "#FFACAD",
    }; // Pinkish Red
  } else if (currentDayOfCycle <= follicularEnd) {
    return {
      phase: "Follicular Phase",
      day: currentDayOfCycle - menstrualEnd,
      color: "#9FE0A1",
      colorLight: "#CCFFD7",
    }; // Blue
  } else if (currentDayOfCycle <= ovulationEnd) {
    return {
      phase: "Ovulation",
      day: currentDayOfCycle - follicularEnd,
      color: "#FFDB81",
      colorLight: "#FFF29C",
    }; // Yellow
  } else {
    return {
      phase: "Luteal Phase",
      day: currentDayOfCycle - ovulationEnd,
      color: "#D9C7C0",
      colorLight: "#F2DFD6",
    }; // Purple
  }
};
//   if (currentDayOfCycle <= menstrualEnd) {
//     return { phase: "Menstrual Phase", day: currentDayOfCycle };
//   } else if (currentDayOfCycle <= follicularEnd) {
//     return {
//       phase: "Follicular Phase",
//       day: currentDayOfCycle - menstrualEnd,
//     };
//   } else if (currentDayOfCycle <= ovulationEnd) {
//     return { phase: "Ovulation", day: currentDayOfCycle - follicularEnd };
//   } else {
//     return { phase: "Luteal Phase", day: currentDayOfCycle - ovulationEnd };
//   }
// };

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

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

export default function MainScreen() {
  const router = useRouter(); // Initialize the router

  const [status, setStatus] = useState("loading"); // 'loading', 'error', 'success'
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phase: "",
    phaseDay: 1,
    lastPeriod: "",
    color: "",
    colorLight: "",
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-250)).current; // Sidebar width is 250
  // const symptoms = "Tired"; // This can also be fetched if stored
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
          lastPeriod: lastPeriod || 14,
          color: cycleInfo.color ?? "#993341",
          colorLight: cycleInfo.colorLight ?? "#FFACAD",
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
      <View style={styles.container}>
        {/* <View style={styles.statusBarBackground} /> */}
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
        <StatusBar style="light" />
        <ScrollView>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: userData.color }]}>
            <Text style={styles.appTitle}>CycleSync</Text>
            <View style={styles.headerIcons}>
              <FontAwesome5 name="crown" size={20} color="#FFD270" />
              <Ionicons name="calendar-outline" size={20} color="#fff" />
              {/* <View style={styles.profileDot} /> */}

              <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                <View style={styles.profileCircle}>
                  <Text style={styles.profileInitial}>{userData.name[0]}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Row */}
          <ScrollView
            horizontal
            contentContainerStyle={styles.dateRow}
            showsHorizontalScrollIndicator={false}
            style={{
              width: "100%",
              backgroundColor: "#993341",
              borderBottomLeftRadius: 26,
              borderBottomRightRadius: 26,
              paddingBottom: 30,
            }}
          >
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
                  <View
                    key={index}
                    style={
                      isToday
                        ? [
                            styles.todayBox1,
                            { borderColor: userData.colorLight },
                          ]
                        : styles.todayBox
                    }
                  >
                    <View
                      style={[
                        styles.calendarDay,
                        // isToday && styles.todayCalendarDay,
                        // isPassed && styles.passedCalendarDay,
                      ]}
                    >
                      <Text
                        style={[
                          isToday ? styles.todayText : styles.calendarDayText,
                          // isToday && styles.todayCalendarDayText,
                          // isPassed && styles.passedCalendarDayText,
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                    </View>
                    <Text
                      style={
                        isToday ? styles.todayText : styles.calendarDayOfWeek
                      }
                    >
                      {WEEK_DAYS[date.getDay()]}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          {/* {["21 M", "22 T", "23 W", "24 Today", "25 F", "26 S", "27 S"].map(
            (d, i) => (
              <View
                key={i}
                style={[
                  styles.dateItem,
                  d.includes("Today") && styles.todayBox,
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    d.includes("Today") && styles.todayText,
                  ]}
                >
                  {d}
                </Text>
              </View>
            )
          )} */}

          {/* Period Day & Stats */}
          <View
            style={{
              backgroundColor: "transparent",
              marginTop: -50,
              paddingBottom: 50,
            }}
          >
            <View style={styles.statsRow}>
              <View
                style={[
                  styles.periodCircle,
                  { backgroundColor: userData.colorLight },
                ]}
              >
                <Text style={styles.periodTitle}>{userData.phase}</Text>
                <Text style={styles.periodDayLabel}>Day</Text>
                <Text style={styles.periodDay}>{userData.phaseDay}</Text>
                <TouchableOpacity style={styles.logButton}>
                  <EvilIcons
                    name="pencil"
                    size={20}
                    style={{ color: "#A4525E" }}
                  />
                  <Text style={styles.logButtonText}>Log</Text>
                </TouchableOpacity>
              </View>
              <View style={{ gap: 10 }}>
                <View style={styles.periodInfoBox}>
                  <Text style={styles.periodInfoTitle}>Periods end in</Text>
                  <Text style={styles.periodInfoValue}>
                    2 <Text style={styles.daysLabel}>Days</Text>
                  </Text>
                </View>
                <View
                  style={[
                    styles.periodInfoBoxPink,
                    { backgroundColor: userData.colorLight },
                  ]}
                >
                  <Text style={styles.periodInfoTitle}>Ovulation in</Text>
                  <Text style={styles.periodInfoValue}>
                    {userData.lastPeriod}
                    <Text style={styles.daysLabel}> Days</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Pregnancy chance */}
            <View style={styles.pregnancyBox}>
              <Text style={styles.pregnancyText}>
                Lower chances of getting pregnant
              </Text>
            </View>

            {/* Greeting & Mood */}
            <Text style={styles.greeting}>Hi, {userData.name}!</Text>
            <Text style={styles.subtitle}>
              How{"'"}re you feeling? you can log your mood, symptoms and more
              here…
            </Text>
            <TouchableOpacity style={styles.feelingButton}>
              <Text style={styles.feelingButtonText}>I am feeling…</Text>
            </TouchableOpacity>

            {/* Tips Header */}
            <Text style={styles.tipsTitle}>
              Here are some tips of the day for you…
            </Text>

            {/* Tips Cards */}
            {[
              {
                img: require("../assets/images/dashboard/tip1.png"),
                text: "You can do some light stretching as well as some meditation and\nTake rest.",
                bg: "#DFF4FF",
              },
              {
                img: require("../assets/images/dashboard/tip2.png"),
                text: "You can eat oranges or have a ginger tea. xyz kmn…..",
                bg: "#FFEFE3",
              },
              {
                img: require("../assets/images/dashboard/tip3.png"),
                text: "Prioritize self-care, adjust your workload, Listening to your favorite music helps too",
                bg: "#E5EFF3",
              },
            ].map((tip, i) => (
              <View
                key={i}
                style={[styles.tipCard, { backgroundColor: tip.bg }]}
              >
                <Image source={tip.img} style={styles.tipImage} />
                <Text style={styles.tipText}>{tip.text}</Text>
                {/* <TouchableOpacity style={styles.tipArrow}>
                  <Entypo name="chevron-right" size={20} />
                </TouchableOpacity> */}
              </View>
            ))}

            {/* Health Exam */}
            <Text style={styles.healthExamText}>
              Suspecting or having any health condition?{"\n"}Take a test.
            </Text>
            {/* <View style={styles.healthExamBox}>
              <View>
                <Text style={styles.healthExamTitle}>Health Exam</Text>
                <Text style={styles.healthExamDesc}>
                  Answer some simple questions to better understand your body…
                </Text>
              </View>
              <TouchableOpacity>
                <Entypo name="chevron-right" size={20} />
              </TouchableOpacity>
            </View> */}

            {/* Footer Quote */}
            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>
                {'"'}Periods are powerful, but so am I{'"'} 💪🏼✨
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  profileCircle: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  appTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    padding: 8,
    borderRadius: 10,
  },
  statusBarBackground: {
    height: 50,
    backgroundColor: "#993341",
  },
  headerIcons: { flexDirection: "row", gap: 16, alignItems: "center" },
  //   icon: { marginHorizontal: 8 },
  profileDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#000",
  },
  dateRow: {
    flexDirection: "row",
    backgroundColor: "#993341",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  dateItem: {
    padding: 10,
    backgroundColor: "#F86484",
    borderRadius: 10,
    marginHorizontal: 4,
  },
  todayBox: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    // backgroundColor: "#C2185B",
    borderWidth: 2,
    borderColor: "#fff",
  },
  todayBox1: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 2,
    // borderColor: "#C2185B",
  },

  dateText: { color: "#fff", fontWeight: "bold" },
  todayText: { color: "#black", fontSize: 16 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  periodCircle: {
    width: 140,
    height: 150,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#A4525E",
  },
  periodTitle: { fontSize: 18, fontWeight: "bold", color: "#A4525E" },
  periodDayLabel: { fontSize: 12 },
  periodDay: { fontSize: 36, fontWeight: "bold" },
  logButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
  logButtonText: { color: "#A4525E", fontWeight: "bold" },
  periodInfoBox: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    width: 160,
  },
  periodInfoBoxPink: {
    backgroundColor: "#FCD6DE",
    padding: 12,
    borderRadius: 14,
    width: 160,
  },
  periodInfoTitle: { fontSize: 14, textAlign: "center" },
  periodInfoValue: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  daysLabel: { fontSize: 14, color: "grey" },
  pregnancyBox: {
    backgroundColor: "#FFF3B0",
    padding: 10,
    margin: 16,
    marginTop: 0,
    borderRadius: 10,
  },
  pregnancyText: { textAlign: "center", color: "#444", fontWeight: "500" },
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 16,
  },
  subtitle: { fontSize: 20, marginHorizontal: 16, marginTop: 6, color: "#555" },
  feelingButton: {
    backgroundColor: "#2F4550",
    margin: 16,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  feelingButtonText: { color: "#fff", fontSize: 16 },
  tipsTitle: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 12,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    // padding: 12,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  tipImage: { width: 100, height: 100, marginRight: 12 },
  tipText: { flex: 1, color: "#333", fontSize: 18 },
  tipArrow: { padding: 6 },
  healthExamText: {
    marginHorizontal: 16,
    marginVertical: 12,
    color: "#333",
    fontSize: 18,
  },
  healthExamBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E9FEE9",
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#999",
  },
  healthExamTitle: { fontSize: 18, fontWeight: "600" },
  healthExamDesc: { fontSize: 14, color: "#555" },
  quoteBox: {
    backgroundColor: "#3D0146",
    margin: 16,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  quoteText: { color: "#fff", fontStyle: "italic", fontSize: 16 },

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
    fontSize: 12,
    color: "white",
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
    // backgroundColor: "white",
  },
  todayCalendarDayText: {
    color: "white",
    fontWeight: "bold",
  },
  calendarDayText: {
    color: "white",
    fontWeight: "900",
    fontSize: 16,
  },
  calendarDay: {
    width: 40,
    height: 40,
    // borderRadius: 20,
    // borderWidth: 1,
    // borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    marginLeft: 5,
    gap: 10,
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FEFDE9",
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 80,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   headerText: {
//     fontSize: 18,
//   },
//   monthRow: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 8,
//   },
//   monthText: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   calendarRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 16,
//     gap: 15,
//   },
//   calendarDay: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#888",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   activeCalendarDay: {
//     backgroundColor: "#e75480",
//   },
//   calendarDayText: {
//     color: "black",
//   },
//   activeCalendarDayText: {
//     color: "white",
//   },
//   inputRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 24,
//   },
//   inputButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "white",
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     elevation: 2,
//   },
//   inputButtonText: {
//     color: "black",
//     fontSize: 14,
//   },
//   phaseContainer: {
//     alignItems: "center",
//     marginBottom: 24,
//   },
//   phaseCircle: {
//     width: 160,
//     height: 160,
//     borderRadius: 100,
//     backgroundColor: "rgba(133, 82, 239, 1)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   phaseText: {
//     color: "white",
//     fontSize: 16,
//     textAlign: "center",
//     fontWeight: "600",
//   },
//   cardsContainer: {
//     marginBottom: 16,
//   },
//   card: {
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   orangeCard: {
//     backgroundColor: "#ffe5b4",
//   },
//   yellowCard: {
//     backgroundColor: "#fff9c4",
//   },
//   greenCard: {
//     backgroundColor: "#d0f0c0",
//   },
//   pinkCard: {
//     backgroundColor: "#f8c8dc",
//   },
//   cardTitle: {
//     fontWeight: "700",
//     marginBottom: 8,
//   },
//   cardText: {
//     fontSize: 14,
//     lineHeight: 18,
//   },
//   profileCircle: {
//     width: 46,
//     height: 46,
//     borderRadius: 50,
//     backgroundColor: "#a01aa0",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   profileInitial: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   sidebarOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.3)",
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "stretch",
//   },
//   sidebar: {
//     width: 250,
//     backgroundColor: "#fff",
//     paddingTop: 60,
//     paddingHorizontal: 20,
//     alignItems: "center",
//     height: "100%",
//     shadowColor: "#000",
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 8,
//     borderTopRightRadius: 16,
//     borderBottomRightRadius: 16,
//   },
//   sidebarProfileCircle: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#a01aa0",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   sidebarProfileInitial: {
//     color: "white",
//     fontSize: 28,
//     fontWeight: "bold",
//   },
//   sidebarName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 32,
//     color: "#333",
//   },
//   sidebarLogoutButton: {
//     backgroundColor: "#EAA4FA",
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 20,
//   },
//   sidebarLogoutText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   sidebarCloseIcon: {
//     position: "absolute",
//     top: 16,
//     right: 16,
//     zIndex: 10,
//   },
//   calendarDayOfWeek: {
//     fontSize: 10,
//     color: "black",
//     textAlign: "center",
//     marginTop: 2,
//   },
//   calendarDayCount: {
//     position: "absolute",
//     top: -16,
//     height: 20,
//     width: 20,
//     right: -20,
//     fontSize: 10,
//     color: "#fff",
//     backgroundColor: "rgba(226, 58, 172, 1)",
//     borderRadius: 10,
//     paddingHorizontal: 4,
//     fontWeight: "bold",
//     zIndex: 2,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingTop: 2,
//   },
//   passedCalendarDay: {
//     backgroundColor: "#f5cee9",
//     borderColor: "rgba(226, 58, 172, 1)",
//   },
//   passedCalendarDayText: {
//     color: "rgba(226, 58, 172, 1)",
//   },
//   todayCalendarDay: {
//     backgroundColor: "rgba(226, 58, 172, 0.72)",
//   },
//   todayCalendarDayText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });
