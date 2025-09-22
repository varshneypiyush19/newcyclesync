// // import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
// // import React from "react";
// // import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";

// // const OPTIONS = [
// //   "Ease PMS symptoms",
// //   "Cycle-aligned fitness & diet",
// //   "Boost productivity",
// //   "Support for PCOS",
// //   "Track health with reports",
// //   "Personalized nutrition tips",
// //   // "Learn what foods and habits work for my body",
// //   // "Emotional support or mental health aligned to cycle",
// // ] as const;

// // type OptionType = (typeof OPTIONS)[number];
// // export default function HealthGoalsScreen({
// //   current,
// //   handleAnswer,
// //   inputValue,
// //   setInputValue,
// // }) {
// //   const toggleOption = (option: OptionType) => {
// //     if (inputValue.includes(option)) {
// //       setInputValue((prev) => prev.filter((item) => item !== option));
// //     } else {
// //       setInputValue((prev) => [...prev, option]);
// //     }
// //   };

// //   return (
// //     <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
// //       <View
// //         style={{
// //           paddingTop: 10,
// //           justifyContent: "space-around",
// //           // alignItems: "center",
// //           flexDirection: "row",
// //         }}
// //       >
// //         <View style={{ alignItems: "center" }}>
// //           <MaterialIcons name="broken-image" size={20} />
// //           <Text style={{ fontWeight: 900, fontSize: 25 }}>•</Text>
// //         </View>

// //         <View style={{ alignItems: "center" }}>
// //           <Ionicons name="document-text-outline" size={20} />
// //         </View>
// //         <View>
// //           <SimpleLineIcons name="bell" size={20} />
// //         </View>
// //       </View>
// //       <View
// //         style={{
// //           alignItems: "center",
// //           paddingHorizontal: 40,
// //           marginBottom: 40,
// //         }}
// //       >
// //         <Text style={{ fontSize: 30, textAlign: "center" }}>
// //           {current.question}
// //         </Text>
// //       </View>

// //       <View style={{ flex: 1, justifyContent: "center" }}>
// //         <View style={styles.container}>
// //           {OPTIONS.map((option, index) => (
// //             <TouchableOpacity
// //               key={index}
// //               style={[
// //                 styles.option,
// //                 inputValue.includes(option) && styles.optionSelected,
// //               ]}
// //               onPress={() => toggleOption(option)}
// //             >
// //               <Text
// //                 style={[
// //                   styles.optionText,
// //                   inputValue.includes(option) && styles.optionTextSelected,
// //                 ]}
// //               >
// //                 {option}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         <View style={styles.buttons}>
// //           <TouchableOpacity
// //           // onPress={handleSkip}
// //           >
// //             <Text style={styles.skipText}>Skip</Text>
// //           </TouchableOpacity>

// //           <TouchableOpacity style={styles.nextButton} onPress={handleAnswer}>
// //             <Text style={styles.nextButtonText}>Next</Text>
// //           </TouchableOpacity>
// //         </View>
// //         {/* Bottom Illustration */}
// //         <View style={{ alignItems: "center" }}>
// //           <Image
// //             source={require("../../assets/images/screens/screen12.png")}
// //             style={{ width: "100%", height: 250, resizeMode: "contain" }}
// //           />
// //         </View>
// //       </View>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     // flex: 1,
// //     padding: 24,
// //     justifyContent: "center",
// //   },
// //   title: {
// //     fontSize: 20,
// //     fontWeight: "bold",
// //     marginBottom: 6,
// //   },
// //   subtitle: {
// //     fontSize: 14,
// //     color: "#666",
// //     marginBottom: 20,
// //   },
// //   option: {
// //     backgroundColor: "#E8D5C7",
// //     // borderWidth: 1,
// //     // borderColor: "#ccc",
// //     borderRadius: 12,
// //     padding: 14,
// //     marginBottom: 12,
// //   },
// //   optionSelected: {
// //     backgroundColor: "#655950",
// //     // borderColor: "#4CAF50",
// //   },
// //   optionText: {
// //     fontSize: 20,
// //     color: "#333",
// //   },
// //   optionTextSelected: {
// //     color: "#fff",
// //     fontWeight: "bold",
// //   },
// //   submitBtn: {
// //     marginTop: 30,
// //     backgroundColor: "#4CAF50",
// //     paddingVertical: 14,
// //     borderRadius: 10,
// //     alignItems: "center",
// //   },
// //   submitText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   buttons: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 32,
// //     alignItems: "center",
// //     // marginBottom: 10,
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
// //   nextButtonText: {
// //     color: "#fff",
// //     fontWeight: "600",
// //     fontSize: 16,
// //   },
// // });

// import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
// import React from "react";
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const OPTIONS = [
//   "Ease PMS symptoms",
//   "Cycle-aligned fitness & diet",
//   "Boost productivity",
//   "Support for PCOS",
//   "Track health with reports",
//   "Personalized nutrition tips",
// ] as const;

// type OptionType = (typeof OPTIONS)[number];

// export default function HealthGoalsScreen({
//   current,
//   handleAnswer,
//   inputValue,
//   setInputValue,
// }) {
//   const toggleOption = (option: OptionType) => {
//     if (inputValue.includes(option)) {
//       setInputValue((prev) => prev.filter((item) => item !== option));
//     } else {
//       setInputValue((prev) => [...prev, option]);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerIcon}>
//           <MaterialIcons name="broken-image" size={20} />
//           <Text style={styles.dot}>•</Text>
//         </View>
//         <Ionicons name="document-text-outline" size={20} />
//         <SimpleLineIcons name="bell" size={20} />
//       </View>

//       {/* Scrollable Content */}
//       <ScrollView
//         contentContainerStyle={styles.scrollContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Question */}
//         <Text style={styles.question}>{current.question}</Text>

//         {/* Options */}
//         <View style={styles.optionsWrapper}>
//           {OPTIONS.map((option, index) => (
//             <TouchableOpacity
//               key={index}
//               style={[
//                 styles.option,
//                 inputValue.includes(option) && styles.optionSelected,
//               ]}
//               onPress={() => toggleOption(option)}
//             >
//               <Text
//                 style={[
//                   styles.optionText,
//                   inputValue.includes(option) && styles.optionTextSelected,
//                 ]}
//               >
//                 {option}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Buttons */}
//         <View style={styles.buttons}>
//           <TouchableOpacity>
//             <Text style={styles.skipText}>Skip</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.nextButton} onPress={handleAnswer}>
//             <Text style={styles.nextButtonText}>Next</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Bottom Illustration */}
//         <Image
//           source={require("../../assets/images/screens/screen12.png")}
//           style={styles.illustration}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#FEFDE9",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 40,
//     paddingTop: 10,
//   },
//   headerIcon: {
//     alignItems: "center",
//   },
//   dot: {
//     fontWeight: "900",
//     fontSize: 25,
//   },
//   scrollContainer: {
//     padding: 24,
//     paddingBottom: 40,
//   },
//   question: {
//     fontSize: 26,
//     textAlign: "center",
//     marginBottom: 24,
//     fontWeight: "600",
//   },
//   optionsWrapper: {
//     marginBottom: 24,
//   },
//   option: {
//     backgroundColor: "#E8D5C7",
//     borderRadius: 12,
//     padding: 14,
//     marginBottom: 12,
//   },
//   optionSelected: {
//     backgroundColor: "#655950",
//   },
//   optionText: {
//     fontSize: 18,
//     color: "#333",
//   },
//   optionTextSelected: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   buttons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 8,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   skipText: {
//     fontSize: 16,
//     color: "#555",
//   },
//   nextButton: {
//     backgroundColor: "#655950",
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   nextButtonText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 16,
//   },
//   illustration: {
//     width: "100%",
//     height: 220,
//     resizeMode: "contain",
//     marginTop: 10,
//   },
// });

import { Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
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

const OPTIONS = [
  "Ease PMS symptoms",
  "Cycle-aligned fitness & diet",
  "Boost productivity",
  "Support for PCOS",
  "Track health with reports",
  "Personalized nutrition tips",
] as const;

type OptionType = (typeof OPTIONS)[number];

export default function HealthGoalsScreen({
  current,
  handleAnswer,
  inputValue,
  setInputValue,
}) {
  const toggleOption = (option: OptionType) => {
    if (inputValue.includes(option)) {
      setInputValue((prev) => prev.filter((item) => item !== option));
    } else {
      setInputValue((prev) => [...prev, option]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <MaterialIcons name="broken-image" size={20} />
          <Text style={styles.dot}>•</Text>
        </View>
        <Ionicons name="document-text-outline" size={20} />
        <SimpleLineIcons name="bell" size={20} />
      </View>

      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={true}
        persistentScrollbar
      >
        <Text style={styles.question}>{current.question}</Text>

        <View style={styles.optionsWrapper}>
          {OPTIONS.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                inputValue.includes(option) && styles.optionSelected,
              ]}
              onPress={() => toggleOption(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  inputValue.includes(option) && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.buttons}>
          <TouchableOpacity>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleAnswer}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../assets/images/screens/screen12.png")}
          style={styles.illustration}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEFDE9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingTop: 10,
  },
  headerIcon: {
    alignItems: "center",
  },
  dot: {
    fontWeight: "900",
    fontSize: 25,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 20,
  },
  question: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "600",
  },
  optionsWrapper: {
    marginBottom: 24,
  },
  option: {
    backgroundColor: "#E8D5C7",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: "#655950",
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  skipText: {
    fontSize: 16,
    color: "#555",
  },
  nextButton: {
    backgroundColor: "#655950",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  illustration: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});
