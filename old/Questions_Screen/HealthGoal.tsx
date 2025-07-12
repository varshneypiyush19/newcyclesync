import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const OPTIONS = [
  "Reduce PMS symptoms (cramps, mood swings, fatigue)",
  "Get fitness and diet tips aligned to my cycle",
  "Improve productivity by understanding my phases",
  "Support for PCOS (hormonal imbalance, irregular cycles)",
  "Get monthly reports to track my health",
  "Easy access to gynecologists when needed",
  "Learn what foods and habits work for my body",
  "Emotional support or mental health aligned to cycle",
] as const;

type OptionType = (typeof OPTIONS)[number];
export default function HealthGoalsScreen({ inputValue, setInputValue }) {
  const toggleOption = (option: OptionType) => {
    if (inputValue.includes(option)) {
      setInputValue((prev) => prev.filter((item) => item !== option));
    } else {
      setInputValue((prev) => [...prev, option]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  option: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  submitBtn: {
    marginTop: 30,
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
