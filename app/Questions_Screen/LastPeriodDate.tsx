import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const PeriodStartDate = ({
  current,
  handleAnswer,
  inputValue,
  setInputValue,
}) => {
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    // Set default value if not already set
    if (!inputValue) setInputValue(today);
  }, []);

  const onDateChange = (date) => {
    setInputValue(date);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
      {/* Top Navigation Icons */}
      <View style={styles.topNav}>
        <View style={{ alignItems: "center" }}>
          <MaterialDesignIcons name="timer-play-outline" size={20} />
          <Text style={styles.dotText}>•</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialDesignIcons name="arrow-expand-horizontal" size={20} />
        </View>
        <View>
          <MaterialDesignIcons name="water-check-outline" size={20} />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* Title */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>{current.question}</Text>
        </View>

        {/* Calendar */}
        <View style={styles.calendarWrapper}>
          <Calendar
            current={inputValue}
            onDayPress={(day) => onDateChange(day.dateString)}
            markedDates={{
              [inputValue]: {
                selected: true,
                selectedColor: "#655950",
                selectedTextColor: "#fff",
              },
            }}
            theme={{
              backgroundColor: "#FEFDE9",
              calendarBackground: "#FEFDE9",
              dayTextColor: "#333",
              textDisabledColor: "#999",
              arrowColor: "#333",
              monthTextColor: "#333",
              textMonthFontWeight: "500",
              textMonthFontSize: 18,
              textDayFontSize: 16,
              textDayFontWeight: "500",
              selectedDayBackgroundColor: "#655950",
            }}
            style={{ borderRadius: 12, marginTop: 20 }}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => handleAnswer("")}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => handleAnswer(inputValue)}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Illustration */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/screens/screen8.png")}
            style={{ width: "100%", height: 180, resizeMode: "contain" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topNav: {
    flex: 1 / 5,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  dotText: {
    fontWeight: "900",
    fontSize: 25,
  },
  title: {
    fontSize: 30,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  calendarWrapper: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    alignItems: "center",
    marginTop: 10,
  },
  skipText: {
    fontSize: 16,
    color: "#555",
  },
  nextButton: {
    backgroundColor: "#655950",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 110,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default PeriodStartDate;
