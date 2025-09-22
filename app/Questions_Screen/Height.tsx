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
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("2");

  const convertToFeetInches = (cm) => {
    const totalInches = parseFloat(cm) / 2.54;
    const ft = Math.floor(totalInches / 12);
    const inch = Math.round(totalInches % 12);
    return { ft: String(ft), inch: String(inch) };
  };

  const handleUnitSwitch = (newUnit) => {
    if (unit === newUnit) return;

    if (newUnit === "IM") {
      const { ft, inch } = convertToFeetInches(inputValue || "0");
      setFeet(ft);
      setInches(inch);
    } else {
      const ft = parseInt(feet || "0");
      const inch = parseInt(inches || "0");
      const cm = (ft * 30.48 + inch * 2.54).toFixed(2);
      setInputValue(cm);
    }

    setUnit(newUnit);
  };

  const handleInputChange = (field, value) => {
    if (unit === "SI") {
      setInputValue(value);
    } else {
      if (field === "feet") setFeet(value);
      if (field === "inches") setInches(value);

      const ft = field === "feet" ? value : feet;
      const inch = field === "inches" ? value : inches;

      const cm = (
        parseInt(ft || "0") * 30.48 +
        parseInt(inch || "0") * 2.54
      ).toFixed(2);
      setInputValue(cm);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
        <View
          style={{
            flex: 2 / 4,
            justifyContent: "space-around",
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
            <Ionicons name="scale-outline" size={20} />
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

            {/* Input Fields */}
            {unit === "SI" ? (
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={inputValue}
                  onChangeText={(val) => handleInputChange("cm", val)}
                  placeholderTextColor={"grey"}
                />
                <Text style={styles.unitLabel}>CM</Text>
              </View>
            ) : (
              <View style={styles.row}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={feet}
                  onChangeText={(val) => handleInputChange("feet", val)}
                  placeholderTextColor={"grey"}
                />
                <Text style={styles.unitLabel}>Ft</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={inches}
                  onChangeText={(val) => handleInputChange("inches", val)}
                  placeholderTextColor={"grey"}
                />
                <Text style={styles.unitLabel}>In</Text>
              </View>
            )}
          </View>

          {/* Next Button */}
          <View style={{ alignItems: "flex-end", paddingHorizontal: 24 }}>
            <TouchableOpacity style={styles.button} onPress={handleAnswer}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Image */}
          <View style={{ justifyContent: "center" }}>
            <Image
              source={girl}
              style={{ width: "70%", height: "70%", resizeMode: "contain" }}
            />
          </View>
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
    marginTop: 10,
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
    width: 70,
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
});

export default HeightInput;
