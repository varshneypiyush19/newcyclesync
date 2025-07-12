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
import girl from "../../assets/images/screens/screen4.png";

const HeightInput = ({ current, handleAnswer, inputValue, setInputValue }) => {
  const [unit, setUnit] = useState("SI"); // SI = CM, IM = Ft/In
  const [cmHeight, setCmHeight] = useState("160");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("2");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
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
          </View>

          <View style={{ alignItems: "center" }}>
            <MaterialDesignIcons name="arrow-expand-vertical" size={20} />

            <Text style={{ fontWeight: 900, fontSize: 25 }}>•</Text>
          </View>
          <View>
            <Ionicons
              name="scale-outline"
              size={20}
              style={{ fontWeight: 900 }}
            />
          </View>
        </View>

        <View style={styles.content}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.title}>{current.question}</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            {/* Unit Switch */}
            <View style={styles.unitSwitch}>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "SI" && styles.unitButtonActive,
                ]}
                onPress={() => setUnit("SI")}
              >
                <Text style={styles.unitText}>SI</Text>
                {unit === "SI" && <View style={styles.dot} />}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "IM" && styles.unitButtonActive,
                ]}
                onPress={() => setUnit("IM")}
              >
                <Text style={styles.unitText}>IM</Text>
                {unit === "IM" && <View style={styles.dot} />}
              </TouchableOpacity>
            </View>
            <View>
              {/* Input Fields */}

              {unit === "SI" ? (
                <View style={styles.row}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={cmHeight}
                    onChangeText={setCmHeight}
                  />
                  <Text style={styles.unitLabel}>CM</Text>
                </View>
              ) : (
                <View style={styles.row}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={feet}
                    onChangeText={setFeet}
                  />
                  <Text style={styles.unitLabel}>Ft</Text>

                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={inches}
                    onChangeText={setInches}
                  />
                  <Text style={styles.unitLabel}>In</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ alignItems: "flex-end", paddingHorizontal: 24 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                let finalVal = "";

                if (unit === "SI") {
                  finalVal = cmHeight;
                } else {
                  const ft = parseInt(feet || "0");
                  const inch = parseInt(inches || "0");
                  finalVal = (ft * 30.48 + inch * 2.54).toFixed(2);
                }

                setInputValue(finalVal); // 🧠 Update inputValue used in main logic
                handleAnswer(); // 🚀 Call the main handler
              }}
              // handleAnswer}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

          <View style={{ justifyContent: "center" }}>
            <Image
              source={girl}
              style={{ width: "70%", height: "70%", resizeMode: "contain" }}
            />
          </View>
          {/* <TouchableOpacity style={styles.button} onPress={handleAnswer}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

          <Image source={girl} style={styles.image} /> */}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  topText: {
    fontSize: 14,
    color: "#333",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    color: "#333",
  },
  unitSwitch: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
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
    marginTop: 30,
    gap: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#888",
    fontSize: 28,
    width: 60,
    textAlign: "center",
    color: "#333",
  },
  unitLabel: {
    fontSize: 18,
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
  image: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginTop: 20,
  },
});

export default HeightInput;
