import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.statusBarBackground} /> */}

      <StatusBar style="dark" />
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>CycleSync</Text>
          <View style={styles.headerIcons}>
            <FontAwesome5 name="crown" size={20} color="#FFD270" />
            <Ionicons name="calendar-outline" size={20} color="#fff" />
            {/* <View style={styles.profileDot} /> */}
            <View style={styles.profileCircle}>
              <Text style={styles.profileInitial}>
                P{/* {userData.name[0]} */}
              </Text>
            </View>
          </View>
        </View>

        {/* Date Row */}
        <ScrollView
          horizontal
          contentContainerStyle={styles.dateRow}
          showsHorizontalScrollIndicator={false}
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
        <View style={styles.statsRow}>
          <View style={styles.periodCircle}>
            <Text style={styles.periodTitle}>Periods</Text>
            <Text style={styles.periodDayLabel}>Day</Text>
            <Text style={styles.periodDay}>5</Text>
            <TouchableOpacity style={styles.logButton}>
              <Text style={styles.logButtonText}>Log</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.periodInfoBox}>
            <Text style={styles.periodInfoTitle}>Periods end in</Text>
            <Text style={styles.periodInfoValue}>
              2 <Text style={styles.daysLabel}>Days</Text>
            </Text>
          </View>
          <View style={styles.periodInfoBoxPink}>
            <Text style={styles.periodInfoTitle}>Ovulation in</Text>
            <Text style={styles.periodInfoValue}>
              14 <Text style={styles.daysLabel}>Days</Text>
            </Text>
          </View>
        </View>

        {/* Pregnancy chance */}
        <View style={styles.pregnancyBox}>
          <Text style={styles.pregnancyText}>
            Lower chances of getting pregnant
          </Text>
        </View>

        {/* Greeting & Mood */}
        <Text style={styles.greeting}>Hi, Sneha!</Text>
        <Text style={styles.subtitle}>
          How’re you feeling? you can log your mood, symptoms and more here…
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
            img: require("../assets/images/screens/screen4.png"),
            text: "You can do some light stretching as well as some meditation and\nTake rest.",
            bg: "#DFF4FF",
          },
          {
            img: require("../assets/images/screens/screen4.png"),
            text: "You can eat oranges or have a ginger tea. xyz kmn…..",
            bg: "#FFEFE3",
          },
          {
            img: require("../assets/images/screens/screen4.png"),
            text: "Prioritize self-care, adjust your workload, Listening to your favorite music helps too",
            bg: "#E5EFF3",
          },
        ].map((tip, i) => (
          <View key={i} style={[styles.tipCard, { backgroundColor: tip.bg }]}>
            <Image source={tip.img} style={styles.tipImage} />
            <Text style={styles.tipText}>{tip.text}</Text>
            <TouchableOpacity style={styles.tipArrow}>
              <Entypo name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Health Exam */}
        <Text style={styles.healthExamText}>
          Suspecting or having any health condition?{"\n"}Take a test.
        </Text>
        <View style={styles.healthExamBox}>
          <View>
            <Text style={styles.healthExamTitle}>Health Exam</Text>
            <Text style={styles.healthExamDesc}>
              Answer some simple questions to better understand your body…
            </Text>
          </View>
          <TouchableOpacity>
            <Entypo name="chevron-right" size={20} />
          </TouchableOpacity>
        </View>

        {/* Footer Quote */}
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>
            "Periods are powerful, but so am I" 💪🏼✨
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Constants.statusBarHeight,

    // backgroundColor: "#FEFDE9",
    // paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#993341",
    padding: 16,
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
  todayBox: { backgroundColor: "#fff", borderWidth: 2, borderColor: "#F86484" },
  dateText: { color: "#fff", fontWeight: "bold" },
  todayText: { color: "#F86484" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  periodCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FBC4CA",
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
    width: 120,
  },
  periodInfoBoxPink: {
    backgroundColor: "#FCD6DE",
    padding: 12,
    borderRadius: 14,
    width: 120,
  },
  periodInfoTitle: { fontSize: 14, textAlign: "center" },
  periodInfoValue: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  daysLabel: { fontSize: 14 },
  pregnancyBox: {
    backgroundColor: "#FFF3B0",
    padding: 10,
    margin: 16,
    borderRadius: 10,
  },
  pregnancyText: { textAlign: "center", color: "#444", fontWeight: "500" },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 10,
  },
  subtitle: { marginHorizontal: 16, marginTop: 6, color: "#555" },
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
    padding: 12,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  tipImage: { width: 50, height: 50, marginRight: 12 },
  tipText: { flex: 1, color: "#333" },
  tipArrow: { padding: 6 },
  healthExamText: { marginHorizontal: 16, marginVertical: 12, color: "#333" },
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
});
