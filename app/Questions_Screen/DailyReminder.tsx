// // import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
// // import React, { useEffect, useState } from "react";
// // import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";

// // const REMINDER_TIMES = [
// //   "Morning (7-10 AM)",
// //   "Afternoon (12-3 PM)",
// //   "Evening (6-9 PM)",
// // ];

// // export default function DailyRemindersScreen({
// //   current,
// //   handleAnswer,
// //   inputValue,
// //   setInputValue,
// // }) {
// //   const [remindersEnabled, setRemindersEnabled] = useState(false);
// //   const [selectedTime, setSelectedTime] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (inputValue && typeof inputValue === "object") {
// //       setRemindersEnabled(inputValue.enabled);
// //       setSelectedTime(inputValue.time || null);
// //     } else {
// //       setRemindersEnabled(false);
// //       setSelectedTime(null);
// //     }
// //   }, [inputValue]);

// //   // Save answer whenever state changes
// //   useEffect(() => {
// //     if (!remindersEnabled) {
// //       setInputValue(false);
// //     } else {
// //       setInputValue({ enabled: true, time: selectedTime });
// //     }
// //   }, [remindersEnabled, selectedTime, setInputValue]);
// //   return (
// //     <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
// //       <View
// //         style={{
// //           flex: 1 / 5,
// //           justifyContent: "space-around",
// //           // alignItems: "center",
// //           flexDirection: "row",
// //         }}
// //       >
// //         <View style={{ alignItems: "center" }}>
// //           <MaterialIcons name="broken-image" size={20} />
// //         </View>

// //         <View style={{ alignItems: "center" }}>
// //           <Ionicons name="document-text-outline" size={20} />
// //         </View>
// //         <View style={{ alignItems: "center" }}>
// //           <SimpleLineIcons name="bell" size={20} />

// //           <Text style={{ fontWeight: 900, fontSize: 25 }}>•</Text>
// //         </View>
// //       </View>

// //       <View style={styles.container}>
// //         {/* <View style={styles.toggleRow}>
// //           <Text style={styles.toggleLabel}>No</Text>
// //           <Switch
// //             value={remindersEnabled}
// //             onValueChange={(value) => {
// //               setRemindersEnabled(value);
// //               if (!value) setSelectedTime(null);
// //             }}
// //             trackColor={{ false: "#ccc", true: "#4CAF50" }}
// //             thumbColor={remindersEnabled ? "#fff" : "#888"}
// //           />
// //           <Text style={styles.toggleLabel}>Yes</Text>
// //         </View> */}
// //         <View style={{ marginTop: 30 }}>
// //           <View style={{ alignItems: "center", marginBottom: 10 }}>
// //             <Text style={{ fontSize: 30, textAlign: "center" }}>
// //               {current.question}
// //             </Text>
// //           </View>

// //           <View style={styles.buttons}>
// //             <TouchableOpacity
// //               style={styles.noButton}
// //               onPress={() => {
// //                 setInputValue(false);
// //                 handleAnswer(false);
// //               }}
// //               //  onPress={handleAnswer}
// //             >
// //               <Text style={styles.skipText}>No</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               style={styles.nextButton}
// //               onPress={() => {
// //                 setInputValue({ enabled: true, time: selectedTime });
// //                 handleAnswer({ enabled: true, time: selectedTime });
// //               }}
// //               // onPress={handleAnswer}
// //             >
// //               <Text style={styles.nextButtonText}>Yes</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>
// //       </View>
// //       <View style={{ alignItems: "center" }}>
// //         <Image
// //           source={require("../../assets/images/screens/screen14.png")}
// //           style={{ width: "100%", height: 250, resizeMode: "contain" }}
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 24,
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   question: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //     color: "#333",
// //     marginBottom: 20,
// //   },
// //   subQuestion: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: "#444",
// //     marginBottom: 16,
// //   },
// //   toggleRow: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     gap: 12,
// //   },
// //   toggleLabel: {
// //     fontSize: 16,
// //     color: "#444",
// //   },
// //   option: {
// //     borderWidth: 1,
// //     borderColor: "#ccc",
// //     borderRadius: 12,
// //     padding: 14,
// //     marginBottom: 12,
// //   },
// //   optionSelected: {
// //     backgroundColor: "#4CAF50",
// //     borderColor: "#4CAF50",
// //   },
// //   optionText: {
// //     fontSize: 15,
// //     color: "#333",
// //   },
// //   optionTextSelected: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //   },

// //   buttons: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 32,
// //     alignItems: "center",
// //     marginTop: 10,
// //   },
// //   skipText: {
// //     fontSize: 16,
// //     color: "#555",
// //   },
// //   nextButton: {
// //     backgroundColor: "#655950",
// //     paddingHorizontal: 16,
// //     paddingVertical: 10,
// //     width: 110,
// //     height: 40,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },

// //   noButton: {
// //     backgroundColor: "#E8D5C7",
// //     paddingHorizontal: 16,
// //     paddingVertical: 10,
// //     width: 110,
// //     height: 40,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   nextButtonText: {
// //     color: "#fff",
// //     fontWeight: "600",
// //     fontSize: 16,
// //   },
// // });

// import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const REMINDER_TIMES = [
//   "Morning (7-10 AM)",
//   "Afternoon (12-3 PM)",
//   "Evening (6-9 PM)",
// ];

// export default function DailyRemindersScreen({
//   current,
//   handleAnswer,
//   inputValue,
//   setInputValue,
// }) {
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);

//   useEffect(() => {
//     if (inputValue && typeof inputValue === "object" && inputValue.enabled) {
//       setSelectedTime(inputValue.time || null);
//     } else {
//       setSelectedTime(null);
//     }
//   }, [inputValue]);

//   const onSelectYes = () => {
//     const finalVal = {
//       enabled: true,
//       time: selectedTime || REMINDER_TIMES[0],
//     };
//     setInputValue(finalVal);
//     handleAnswer(finalVal);
//   };

//   const onSelectNo = () => {
//     setInputValue(false);
//     handleAnswer(false);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
//       {/* Top Progress Icons */}
//       <View style={styles.topIcons}>
//         <View style={{ alignItems: "center" }}>
//           <MaterialIcons name="broken-image" size={20} />
//         </View>
//         <View style={{ alignItems: "center" }}>
//           <Ionicons name="document-text-outline" size={20} />
//         </View>
//         <View style={{ alignItems: "center" }}>
//           <SimpleLineIcons name="bell" size={20} />
//           <Text style={styles.dot}>•</Text>
//         </View>
//       </View>

//       <View style={styles.container}>
//         {/* Question */}
//         <View style={{ alignItems: "center", marginBottom: 10 }}>
//           <Text style={styles.questionText}>{current.question}</Text>
//         </View>

//         {/* Time Options */}
//         {/* <View style={{ width: "100%", marginVertical: 10 }}>
//           {REMINDER_TIMES.map((time) => (
//             <TouchableOpacity
//               key={time}
//               style={[
//                 styles.option,
//                 selectedTime === time && styles.optionSelected,
//               ]}
//               onPress={() => setSelectedTime(time)}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   selectedTime === time && styles.optionTextSelected,
//                 ]}
//               >
//                 {time}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View> */}

//         {/* Buttons */}
//         <View style={styles.buttons}>
//           <TouchableOpacity style={styles.noButton} onPress={onSelectNo}>
//             <Text style={styles.skipText}>No</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.nextButton}
//             onPress={onSelectYes}
//             disabled={!selectedTime}
//           >
//             <Text style={styles.nextButtonText}>Yes</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Bottom Image */}
//       <View style={{ alignItems: "center" }}>
//         <Image
//           source={require("../../assets/images/screens/screen14.png")}
//           style={{ width: "100%", height: 250, resizeMode: "contain" }}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   topIcons: {
//     flex: 1 / 5,
//     justifyContent: "space-around",
//     flexDirection: "row",
//   },
//   dot: {
//     fontWeight: "900",
//     fontSize: 25,
//   },
//   container: {
//     padding: 24,
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   questionText: {
//     fontSize: 30,
//     textAlign: "center",
//   },
//   option: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//     width: "100%",
//   },
//   optionSelected: {
//     backgroundColor: "#4CAF50",
//     borderColor: "#4CAF50",
//   },
//   optionText: {
//     fontSize: 15,
//     color: "#333",
//   },
//   optionTextSelected: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   buttons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 32,
//     alignItems: "center",
//     marginTop: 10,
//     width: "100%",
//   },
//   skipText: {
//     fontSize: 16,
//     color: "#555",
//   },
//   noButton: {
//     backgroundColor: "#E8D5C7",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     width: 110,
//     height: 40,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
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
//   nextButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DailyRemindersScreen({
  current,
  handleAnswer,
  inputValue,
  setInputValue,
}) {
  useEffect(() => {
    if (inputValue === false) {
      // Already set to false, no action needed
    } else if (inputValue && typeof inputValue === "object") {
      setInputValue({ enabled: true }); // Ensure only `enabled: true` is kept
    }
  }, []);

  const handleYes = () => {
    const val = { enabled: true };
    setInputValue(val);
    handleAnswer(val);
  };

  const handleNo = () => {
    setInputValue(false);
    handleAnswer(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
      {/* Top progress dots/icons */}
      <View style={styles.topIcons}>
        <View style={{ alignItems: "center" }}>
          <MaterialIcons name="broken-image" size={20} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Ionicons name="document-text-outline" size={20} />
        </View>
        <View style={{ alignItems: "center" }}>
          <SimpleLineIcons name="bell" size={20} />
          <Text style={styles.dot}>•</Text>
        </View>
      </View>

      {/* Question */}
      <View style={styles.container}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={styles.questionText}>{current.question}</Text>
        </View>

        {/* Yes / No Buttons */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.noButton} onPress={handleNo}>
            <Text style={styles.skipText}>No</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleYes}>
            <Text style={styles.nextButtonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Image */}
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../../assets/images/screens/screen14.png")}
          style={{ width: "100%", height: 250, resizeMode: "contain" }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topIcons: {
    flex: 1 / 5,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  dot: {
    fontWeight: "900",
    fontSize: 25,
  },
  container: {
    padding: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: {
    fontSize: 30,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  skipText: {
    fontSize: 16,
    color: "#555",
  },
  noButton: {
    backgroundColor: "#E8D5C7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 110,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
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
