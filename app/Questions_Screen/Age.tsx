// import { Ionicons } from "@expo/vector-icons";
// import { Image } from "expo-image";
// import React, { useState } from "react";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import DatePicker from "react-native-date-picker";
// import { SafeAreaView } from "react-native-safe-area-context";
// import age from "../../assets/images/screens/age.png";

// const AgeInput = ({ current, handleAnswer, inputValue, setInputValue }) => {
//   // const currentYear = new Date().getFullYear();
//   // const years = Array.from({ length: 100 }, (_, i) =>
//   //   (currentYear - i).toString()
//   // );
//   const [date, setDate] = useState(new Date(2005, 0, 1));

//   // const years = Array.from({ length: 100 }, (_, i) => currentYear - i); // last 100 years
//   // const [selectedIndex, setSelectedIndex] = useState(1);
//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }}>
//       <SafeAreaView style={{ flex: 1, backgroundColor: "#FEF7E5" }}>
//         <View style={{ flex: 2 / 4, justifyContent: "space-around" }}>
//           <View>
//             <Text>Age</Text>
//           </View>
//           <View>
//             <Ionicons />
//           </View>
//           <View>
//             <Ionicons />
//           </View>
//         </View>
//         <View style={{ flex: 1 }}>
//           <View style={{ alignItems: "center" }}>
//             <Text style={{}}>{current.question}</Text>
//           </View>

//           {/* Date Picker (Year Only) */}
//           <DatePicker
//             date={date}
//             onDateChange={setDate}
//             mode="date"
//             locale="en"
//             textColor="#333"
//             androidVariant="nativeAndroid"
//             fadeToColor="transparent"
//             maximumDate={new Date()}
//             style={styles.datePicker}
//           />
//           {/* <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={selectedYear}
//               onValueChange={(itemValue) => setSelectedYear(itemValue)}
//               itemStyle={styles.pickerItem}
//               style={styles.picker}
//             >
//               {years.map((year) => (
//                 <Picker.Item label={`${year}`} value={year} key={year} />
//               ))}
//             </Picker>
//           </View> */}

//           <View
//             style={{
//               alignItems: "flex-end",
//               paddingHorizontal: 24,
//             }}
//           >
//             <TouchableOpacity style={styles.button} onPress={handleAnswer}>
//               <Text style={styles.buttonText}>Next</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={{ justifyContent: "flex-end" }}>
//             <Image
//               source={age}
//               style={{ width: " 70%", height: "70%", resizeMode: "cover" }}
//             />
//           </View>
//         </View>
//       </SafeAreaView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fef4e8",
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 22,
//     marginBottom: 30,
//     fontWeight: "500",
//     color: "#333",
//   },
//   pickerItem: {
//     fontSize: 24,
//     color: "#444",
//     textAlign: "center",
//   },
//   pickerContainer: {
//     height: Platform.OS === "ios" ? 180 : 150,
//     width: 200,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: "#444",
//     justifyContent: "center",
//   },
//   picker: {
//     width: "100%",
//     height: "100%",
//   },
//   pickerItem: {
//     fontSize: 24,
//     color: "#444",
//     height: 180,
//   },
//   buttonWrapper: {
//     marginTop: 40,
//     width: 120,
//   },
//   button: {
//     backgroundColor: "#655950",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     width: 110,
//     height: 40,
//     borderRadius: 10,
//     marginBottom: "20%",
//   },
//   buttonText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "600",
//     fontSize: 16,
//   },
// });

// export default AgeInput;

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

// import MaterialDesignIcons from "react-native-vector-icons/material-design-icons";
import age from "../../assets/images/screens/age.png";

const AgeInput = ({ current, handleAnswer, inputValue, setInputValue }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );
  const [selectedIndex, setSelectedIndex] = useState(18);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEF7E5" }}>
        <View
          style={{
            flex: 2 / 4,
            justifyContent: "space-around",
            // alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={styles.topText}>Age</Text>
            <Text style={{ fontWeight: 900, fontSize: 25 }}>•</Text>
          </View>

          <View>
            <MaterialDesignIcons name="arrow-expand-vertical" size={20} />
            {/* <FontAwesome5 name="arrows-alt-v" size={20} /> */}
          </View>
          {/* <FontAwesome5 name="arrows-alt-h" size={20} /> */}
          <View>
            <Ionicons
              name="scale-outline"
              size={20}
              style={{ fontWeight: 900 }}
            />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{current.question}</Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 24,
            }}
          >
            <TextInput
              style={{
                borderWidth: 2,
                borderColor: "grey",
                backgroundColor: "#fff",
                borderRadius: 10,
                padding: 16,
                marginBottom: 24,
                fontSize: 16,
                width: "90%",
              }}
              value={inputValue}
              onChangeText={setInputValue}
              // placeholder="Type your answer here"
            />
          </View>

          {/* Year Picker (Wheel Scrollable) */}
          {/* <View style={[styles.pickerContainer, { height: 160, width: 200 }]}>
            <WheelPicker
              itemStyle={styles.pickerItem}
              // selectedIndex={selectedIndex}
              // selectedValue={years[selectedIndex]}
              options={years}
              onChange={({ index }) => {
                setSelectedIndex(index);
                setInputValue(years[index]);
              }}
            />
          </View> */}

          <View style={{ alignItems: "flex-end", paddingHorizontal: 24 }}>
            <TouchableOpacity style={styles.button} onPress={handleAnswer}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center" }}>
            <Image
              source={age}
              style={{ width: "70%", height: "70%", resizeMode: "cover" }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  topText: {
    fontWeight: "900",
    fontSize: 16,
    color: "#333",
    // paddingLeft: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
    marginBottom: 20,
  },
  pickerItem: {
    fontSize: 24,
    color: "#444",
    textAlign: "center",
  },
  pickerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#655950",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 110,
    height: 40,
    borderRadius: 10,
    marginBottom: "20%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default AgeInput;
