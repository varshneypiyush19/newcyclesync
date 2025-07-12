import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

const OPTIONS = [
  "PCOS or PCOD (diagnosed or suspected)",
  "Anemia / iron deficiency",
  "Thyroid imbalance",
  "Irregular or missing periods",
  "Painful periods (dysmenorrhea)",
  "Mood swings, PMS or PMDD",
  "Fatigue or hormonal acne",
  "Currently on birth control",
  "None of the above / Not sure",
];

export default function KnownConditionsScreen({ inputValue, setInputValue }) {
  const toggleOption = (option: string) => {
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
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
});
