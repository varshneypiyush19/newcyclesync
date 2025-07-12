// import React, { useEffect, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import { CalendarList } from "react-native-calendars";

// interface LastPeriodDateProps {
//   inputValue: string;
//   setInputValue: (date: string) => void;
// }

// const LastPeriodDate: React.FC<LastPeriodDateProps> = ({
//   inputValue,
//   setInputValue,
// }) => {
//   const [selectedDates, setSelectedDates] = useState<Record<string, any>>({});

//   useEffect(() => {
//     if (inputValue) {
//       // Pre-fill selected date when going back
//       setSelectedDates({
//         [inputValue]: {
//           selected: true,
//           marked: true,
//           customStyles: {
//             container: {
//               backgroundColor: "#fff",
//               borderColor: "#EAA4FA",
//               borderWidth: 1.5,
//               borderRadius: 999,
//               width: 28,
//               height: 28,
//               alignItems: "center",
//               justifyContent: "center",
//             },
//             text: {
//               color: "#000",
//               fontWeight: "bold",
//             },
//           },
//         },
//       });
//     }
//   }, [inputValue]);

//   const handleDayPress = (day: { dateString: string }) => {
//     const dateString = day.dateString;

//     const updated = {
//       [dateString]: {
//         selected: true,
//         marked: true,
//         customStyles: {
//           container: {
//             backgroundColor: "#fff",
//             borderColor: "#EAA4FA",
//             borderWidth: 1.5,
//             borderRadius: 999,
//             width: 28,
//             height: 28,
//             alignItems: "center",
//             justifyContent: "center",
//           },
//           text: {
//             color: "#000",
//             fontWeight: "bold",
//           },
//         },
//       },
//     };

//     setSelectedDates(updated);
//     setInputValue(dateString); // ✅ Store selected value
//   };
//   return (
//     <View style={styles.wrapper}>
//       <CalendarList
//         current={new Date().toISOString().split("T")[0]}
//         pastScrollRange={1}
//         futureScrollRange={0}
//         scrollEnabled={true}
//         showScrollIndicator={false}
//         markingType={"custom"}
//         markedDates={selectedDates}
//         onDayPress={handleDayPress}
//         theme={{
//           calendarBackground: "#FFF4F4",
//           textMonthFontWeight: "bold",
//           textDayFontSize: 14,
//           textDayHeaderFontSize: 14,
//           textSectionTitleColor: "#000000",
//           todayTextColor: "#EAA4FA",
//           arrowColor: "#000",
//           textMonthFontSize: 18,
//         }}
//       />
//     </View>
//   );
// };

// export default LastPeriodDate;

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//     marginVertical: 30,
//     marginHorizontal: -15,
//     backgroundColor: "#FFF4F4",
//     borderRadius: 14,
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },
//   step: {
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 20,
//     color: "#000",
//   },
// });

import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import React, { useState } from "react";
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

  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
      {/* Top Navigation Icons */}
      <View
        style={{
          flex: 1 / 5,
          justifyContent: "space-around",
          // alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <MaterialDesignIcons name="timer-play-outline" size={20} />

          <Text style={{ fontWeight: 900, fontSize: 25 }}>•</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <MaterialDesignIcons name="arrow-expand-horizontal" size={20} />
        </View>
        <View>
          <MaterialDesignIcons name="water-check-outline" size={20} />
          {/* <Ionicons
            name="scale-outline"
            size={20}
            style={{ fontWeight: 900 }}
          /> */}
        </View>
      </View>

      {/* <View style={styles.topIcons}>
        <Ionicons name="time-outline" size={22} />
        <View style={styles.dot} />
        <MaterialCommunityIcons name="resize" size={22} />
        <Ionicons name="refresh-outline" size={22} />
      </View> */}

      <View style={{ flex: 1 }}>
        {/* Title */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>{current.question}</Text>
        </View>

        {/* Calendar */}
        <View style={styles.calendarWrapper}>
          <Calendar
            current={selectedDate}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              [selectedDate]: {
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
          <TouchableOpacity
          // onPress={handleSkip}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              setInputValue(selectedDate);
              handleAnswer();
            }}
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
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 30,
    // fontWeight: "500",
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

// import { Ionicons } from "@expo/vector-icons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import React, { useState } from "react";
// import {
//   Image,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Calendar } from "react-native-calendars";

// const PeriodStartDate = ({ current, handleAnswer, handleSkip }) => {
//   const [selectedDate, setSelectedDate] = useState("2025-05-04");

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header Icons */}
//       <View style={styles.topRow}>
//         <Ionicons name="time-outline" size={22} color="#333" />
//         <View style={styles.centerIcons}>
//           <MaterialIcons name="height" size={22} color="#333" />
//           <View style={styles.dot} />
//         </View>
//         <Ionicons name="refresh-outline" size={22} color="#333" />
//       </View>

//       {/* Question Title */}
//       <View style={styles.titleWrapper}>
//         <Text style={styles.titleText}>{current.question}</Text>
//       </View>

//       {/* Calendar Picker */}
//       <View style={styles.calendarWrapper}>
//         <Calendar
//           current={selectedDate}
//           onDayPress={(day) => setSelectedDate(day.dateString)}
//           markedDates={{
//             [selectedDate]: {
//               selected: true,
//               selectedColor: "#655950",
//               selectedTextColor: "#fff",
//             },
//           }}
//           theme={{
//             backgroundColor: "#FEFDE9",
//             calendarBackground: "#FEFDE9",
//             textSectionTitleColor: "#888",
//             dayTextColor: "#333",
//             textDisabledColor: "#ccc",
//             arrowColor: "#333",
//             monthTextColor: "#333",
//             textMonthFontSize: 20,
//             textMonthFontWeight: "bold",
//             textDayFontSize: 16,
//             textDayFontWeight: "500",
//             todayTextColor: "#655950",
//           }}
//           style={styles.calendar}
//         />
//       </View>

//       {/* Buttons */}
//       <View style={styles.buttonRow}>
//         <TouchableOpacity onPress={handleSkip}>
//           <Text style={styles.skipText}>Skip</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.nextButton}
//           onPress={() => handleAnswer(selectedDate)}
//         >
//           <Text style={styles.nextText}>Next</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Illustration */}
//       <View style={styles.imageWrapper}>
//         <Image
//           source={require("../../assets/images/screens/screen6.png")}
//           style={styles.illustration}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FEFDE9",
//   },
//   topRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 28,
//     paddingTop: 12,
//   },
//   centerIcons: {
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   dot: {
//     width: 5,
//     height: 5,
//     borderRadius: 2.5,
//     backgroundColor: "#000",
//     marginTop: 4,
//   },
//   titleWrapper: {
//     alignItems: "center",
//     marginTop: 16,
//   },
//   titleText: {
//     fontSize: 22,
//     fontWeight: "500",
//     color: "#333",
//     textAlign: "center",
//   },
//   calendarWrapper: {
//     paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   calendar: {
//     borderRadius: 12,
//     elevation: 1,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 30,
//     marginTop: 16,
//     alignItems: "center",
//   },
//   skipText: {
//     fontSize: 16,
//     color: "#555",
//   },
//   nextButton: {
//     backgroundColor: "#655950",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     width: 110,
//     height: 40,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   nextText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   imageWrapper: {
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 12,
//     flex: 1,
//   },
//   illustration: {
//     width: "80%",
//     height: 180,
//     resizeMode: "contain",
//   },
// });

// export default PeriodStartDate;
