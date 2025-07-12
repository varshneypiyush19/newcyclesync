import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const length = [
  { code: "1", label: " 1-2 days" },
  { code: "3", label: " 3-4 days" },
  { code: "5", label: " 5-6 days" },
  { code: "7", label: " 7+ days" },
];

export default function PeriodLength({ inputValue, setInputValue }) {
  // const [selectedlength, setSelectedlength] = useState("");

  return (
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
