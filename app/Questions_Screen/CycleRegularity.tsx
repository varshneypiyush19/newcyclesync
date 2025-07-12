import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const length = [
  { code: "very", label: "Very regular" },
  { code: "some", label: "Sometimes irregular" },
  { code: "often", label: "Often unpredictable" },
  { code: "not", label: "I don't get periods currently" },
];

export default function CycleRegularity({
  current,
  handleAnswer,
  inputValue,
  setInputValue,
}) {
  // const [selectedlength, setSelectedlength] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
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
        </View>

        <View style={{ alignItems: "center" }}>
          <MaterialDesignIcons name="arrow-expand-horizontal" size={20} />
        </View>
        <View style={{ alignItems: "center" }}>
          <MaterialDesignIcons name="water-check-outline" size={20} />
          <Text style={{ fontWeight: 900, fontSize: 25 }}>•</Text>

          {/* <Ionicons
            name="scale-outline"
            size={20}
            style={{ fontWeight: 900 }}
          /> */}
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center", paddingHorizontal: 50 }}>
          <Text style={{ fontSize: 30, textAlign: "center" }}>
            {current.question}
          </Text>
        </View>

        <View style={styles.container}>
          {length.map((length) => (
            <TouchableOpacity
              key={length.code}
              style={[
                styles.button,
                inputValue === length.code && styles.selectedButton,
              ]}
              onPress={() => setInputValue(length.code)}
            >
              <Text
                style={[
                  styles.buttonText,
                  inputValue === length.code && styles.selectedText,
                ]}
              >
                {length.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
          // onPress={handleSkip}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleAnswer}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        {/* Bottom Illustration */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/screens/screen10.png")}
            style={{ width: "100%", height: 180, resizeMode: "contain" }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  button: {
    padding: 16,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: "#E8D5C7",
    // borderWidth: 1,
    // borderColor: "#ccc",
    marginBottom: 16,
    alignItems: "center",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    alignItems: "center",
    marginBottom: 20,
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
  selectedButton: {
    backgroundColor: "#655950",
    // borderColor: "#EAA4FA",
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
  },
  selectedText: {
    color: "#fff",
    // fontWeight: "bold",
  },
});
