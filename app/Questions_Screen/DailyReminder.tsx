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
