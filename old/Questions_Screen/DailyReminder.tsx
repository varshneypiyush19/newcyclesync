import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

const REMINDER_TIMES = [
  "Morning (7-10 AM)",
  "Afternoon (12-3 PM)",
  "Evening (6-9 PM)",
];

export default function DailyRemindersScreen({ inputValue, setInputValue }) {
  const [remindersEnabled, setRemindersEnabled] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (inputValue && typeof inputValue === "object") {
      setRemindersEnabled(inputValue.enabled);
      setSelectedTime(inputValue.time || null);
    } else {
      setRemindersEnabled(false);
      setSelectedTime(null);
    }
  }, [inputValue]);

  // Save answer whenever state changes
  useEffect(() => {
    if (!remindersEnabled) {
      setInputValue(false);
    } else {
      setInputValue({ enabled: true, time: selectedTime });
    }
  }, [remindersEnabled, selectedTime, setInputValue]);
  return (
    <View style={styles.container}>
      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>No</Text>
        <Switch
          value={remindersEnabled}
          onValueChange={(value) => {
            setRemindersEnabled(value);
            if (!value) setSelectedTime(null);
          }}
          trackColor={{ false: "#ccc", true: "#4CAF50" }}
          thumbColor={remindersEnabled ? "#fff" : "#888"}
        />
        <Text style={styles.toggleLabel}>Yes</Text>
      </View>

      {remindersEnabled && (
        <View style={{ marginTop: 30 }}>
          <Text style={styles.subQuestion}>
            What time would you prefer to receive reminders?
          </Text>
          {REMINDER_TIMES.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedTime === time && styles.optionSelected,
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedTime === time && styles.optionTextSelected,
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flex: 1,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  subQuestion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  toggleLabel: {
    fontSize: 16,
    color: "#444",
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
