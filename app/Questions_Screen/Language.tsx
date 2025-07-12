import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi (हिन्दी)" },
  { code: "te", label: "Telugu (తెలుగు)" },
];

export default function Language({ inputValue, setInputValue }) {
  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.button,
            inputValue === lang.code && styles.selectedButton,
          ]}
          onPress={() => {
            setInputValue(lang.code);
            {
              console.log(lang.code, inputValue);
            }
          }}
        >
          <Text
            style={[
              styles.buttonText,
              inputValue === lang.code && styles.selectedText,
            ]}
          >
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    padding: 16,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 16,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#EAA4FA",
    borderColor: "#EAA4FA",
  },
  buttonText: {
    fontSize: 18,
    color: "#333",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
