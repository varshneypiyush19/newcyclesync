// import { Ionicons } from "@expo/vector-icons";
// import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
// import { Image } from "expo-image";
// import React, { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import weightGirl from "../../assets/images/screens/screen6.png"; // Replace with your image path

// const WeightInput = ({ current, handleAnswer, inputValue, setInputValue }) => {
//   const [unit, setUnit] = useState("SI"); // SI = Kg, IM = Lb
//   const [kg, setKg] = useState("55");
//   const [lb, setLb] = useState("121");

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }}>
//       <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
//         <View
//           style={{
//             flex: 2 / 6,
//             justifyContent: "space-around",
//             // alignItems: "center",
//             flexDirection: "row",
//           }}
//         >
//           <View>
//             <Text
//               style={{
//                 fontWeight: "900",
//                 fontSize: 16,
//                 color: "#333",
//               }}
//             >
//               Age
//             </Text>
//           </View>

//           <View>
//             <MaterialDesignIcons name="arrow-expand-vertical" size={20} />
//             {/* <FontAwesome5 name="arrows-alt-v" size={20} /> */}
//           </View>
//           {/* <FontAwesome5 name="arrows-alt-h" size={20} /> */}
//           <View style={{ alignItems: "center" }}>
//             <Ionicons
//               name="scale-outline"
//               size={20}
//               style={{ fontWeight: 900 }}
//             />
//             <Text style={{ fontWeight: 900, fontSize: 25 }}>•</Text>
//           </View>
//         </View>

//         {/* Content */}
//         <View style={styles.content}>
//           <View
//             style={{
//               alignItems: "center",
//               paddingHorizontal: 50,
//               marginBottom: 20,
//             }}
//           >
//             <Text style={styles.title}>{current.question}</Text>
//           </View>
//           {/* Unit Switch */}
//           <View style={{ alignItems: "center" }}>
//             <View style={styles.unitSwitch}>
//               <TouchableOpacity
//                 style={[
//                   styles.unitButton,
//                   unit === "SI" && styles.unitButtonActive,
//                 ]}
//                 onPress={() => setUnit("SI")}
//               >
//                 <Text style={styles.unitText}>SI</Text>
//                 {unit === "SI" && <View style={styles.dot} />}
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.unitButton,
//                   unit === "IM" && styles.unitButtonActive,
//                 ]}
//                 onPress={() => setUnit("IM")}
//               >
//                 <Text style={styles.unitText}>IM</Text>
//                 {unit === "IM" && <View style={styles.dot} />}
//               </TouchableOpacity>
//             </View>

//             {/* Input */}
//             <View style={styles.row}>
//               <TextInput
//                 style={styles.input}
//                 keyboardType="numeric"
//                 value={unit === "SI" ? kg : lb}
//                 onChangeText={(val) => {
//                   if (unit === "SI") setKg(val);
//                   else setLb(val);
//                 }}
//               />
//               <Text style={styles.unitLabel}>
//                 {unit === "SI" ? "Kg" : "Lb"}
//               </Text>
//             </View>
//           </View>
//           {/* Next Button */}
//           <View style={{ alignItems: "flex-end", paddingHorizontal: 24 }}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => {
//                 let finalVal = "";

//                 if (unit === "SI") {
//                   finalVal = kg;
//                 } else {
//                   // Convert pounds to kg if needed (optional)
//                   const lbs = parseFloat(lb || "0");
//                   finalVal = (lbs * 0.453592).toFixed(2); // Convert to KG
//                 }

//                 setInputValue(finalVal); // ✅ properly update input value
//                 handleAnswer(finalVal); // ✅ then move to next
//               }}
//               //  onPress={handleAnswer}
//             >
//               <Text style={styles.buttonText}>Next</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Bottom Image */}
//           <View style={{ justifyContent: "center" }}>
//             <Image
//               source={weightGirl}
//               style={{ width: "70%", height: "70%", resizeMode: "contain" }}
//             />
//           </View>
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   topText: {
//     fontSize: 14,
//     color: "#333",
//   },
//   header: {
//     flex: 2 / 4,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingHorizontal: 24,
//   },
//   content: {
//     flex: 1,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: "500",
//     textAlign: "center",
//     color: "#333",
//   },
//   unitSwitch: {
//     flexDirection: "row",
//     gap: 10,
//     marginVertical: 10,
//   },
//   unitButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: "#EFECE3",
//     alignItems: "center",
//   },
//   unitButtonActive: {
//     backgroundColor: "#DFDACF",
//   },
//   unitText: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#000",
//     marginTop: 4,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   input: {
//     borderBottomWidth: 1,
//     borderColor: "#888",
//     fontSize: 40,
//     width: 100,
//     textAlign: "center",
//     color: "#333",
//   },
//   unitLabel: {
//     fontSize: 20,
//     color: "#333",
//   },
//   button: {
//     backgroundColor: "#655950",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     width: 110,
//     height: 40,
//     borderRadius: 10,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

// export default WeightInput;

import { Ionicons } from "@expo/vector-icons";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import weightGirl from "../../assets/images/screens/screen6.png";

const WeightInput = ({ current, handleAnswer, inputValue, setInputValue }) => {
  const [unit, setUnit] = useState("SI"); // SI = Kg, IM = Lb

  // If user switches unit, convert value accordingly
  const convertValue = (val, toUnit) => {
    if (!val || isNaN(val)) return "";

    const num = parseFloat(val);
    return toUnit === "SI"
      ? (num * 0.453592).toFixed(2) // lb to kg
      : (num / 0.453592).toFixed(0); // kg to lb
  };

  // Handle unit change and convert value
  const handleUnitSwitch = (newUnit) => {
    if (unit === newUnit) return;
    const converted = convertValue(inputValue, newUnit);
    setInputValue(converted);
    setUnit(newUnit);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
        {/* Top Info Row */}
        <View
          style={{
            flex: 2 / 6,
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <View>
            <Text style={{ fontWeight: "900", fontSize: 16, color: "#333" }}>
              Age
            </Text>
          </View>
          <View>
            <MaterialDesignIcons name="arrow-expand-vertical" size={20} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Ionicons name="scale-outline" size={20} />
            <Text style={{ fontWeight: 900, fontSize: 25 }}>•</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Question */}
          <View style={{ alignItems: "center", paddingHorizontal: 50 }}>
            <Text style={styles.title}>{current.question}</Text>
          </View>

          {/* Unit Switch */}
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <View style={styles.unitSwitch}>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "SI" && styles.unitButtonActive,
                ]}
                onPress={() => handleUnitSwitch("SI")}
              >
                <Text style={styles.unitText}>SI</Text>
                {unit === "SI" && <View style={styles.dot} />}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "IM" && styles.unitButtonActive,
                ]}
                onPress={() => handleUnitSwitch("IM")}
              >
                <Text style={styles.unitText}>IM</Text>
                {unit === "IM" && <View style={styles.dot} />}
              </TouchableOpacity>
            </View>

            {/* Input Field */}
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={inputValue}
                onChangeText={setInputValue}
              />
              <Text style={styles.unitLabel}>
                {unit === "SI" ? "Kg" : "Lb"}
              </Text>
            </View>
          </View>

          {/* Button */}
          <View style={{ alignItems: "flex-end", paddingHorizontal: 24 }}>
            <TouchableOpacity style={styles.button} onPress={handleAnswer}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Image */}
          <View style={{ justifyContent: "center" }}>
            <Image
              source={weightGirl}
              style={{ width: "70%", height: "70%", resizeMode: "contain" }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
  },
  unitSwitch: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 10,
  },
  unitButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#EFECE3",
    alignItems: "center",
  },
  unitButtonActive: {
    backgroundColor: "#DFDACF",
  },
  unitText: {
    fontSize: 16,
    fontWeight: "500",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000",
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#888",
    fontSize: 40,
    width: 100,
    textAlign: "center",
    color: "#333",
  },
  unitLabel: {
    fontSize: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#655950",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 110,
    height: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default WeightInput;
