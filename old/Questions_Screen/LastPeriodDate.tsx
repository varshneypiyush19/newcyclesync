import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { CalendarList } from "react-native-calendars";

interface LastPeriodDateProps {
  inputValue: string;
  setInputValue: (date: string) => void;
}

const LastPeriodDate: React.FC<LastPeriodDateProps> = ({
  inputValue,
  setInputValue,
}) => {
  const [selectedDates, setSelectedDates] = useState<Record<string, any>>({});

  useEffect(() => {
    if (inputValue) {
      // Pre-fill selected date when going back
      setSelectedDates({
        [inputValue]: {
          selected: true,
          marked: true,
          customStyles: {
            container: {
              backgroundColor: "#fff",
              borderColor: "#EAA4FA",
              borderWidth: 1.5,
              borderRadius: 999,
              width: 28,
              height: 28,
              alignItems: "center",
              justifyContent: "center",
            },
            text: {
              color: "#000",
              fontWeight: "bold",
            },
          },
        },
      });
    }
  }, [inputValue]);

  const handleDayPress = (day: { dateString: string }) => {
    const dateString = day.dateString;

    const updated = {
      [dateString]: {
        selected: true,
        marked: true,
        customStyles: {
          container: {
            backgroundColor: "#fff",
            borderColor: "#EAA4FA",
            borderWidth: 1.5,
            borderRadius: 999,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
          },
          text: {
            color: "#000",
            fontWeight: "bold",
          },
        },
      },
    };

    setSelectedDates(updated);
    setInputValue(dateString); // ✅ Store selected value
  };
  return (
    <View style={styles.wrapper}>
      <CalendarList
        current={new Date().toISOString().split("T")[0]}
        pastScrollRange={1}
        futureScrollRange={0}
        scrollEnabled={true}
        showScrollIndicator={false}
        markingType={"custom"}
        markedDates={selectedDates}
        onDayPress={handleDayPress}
        theme={{
          calendarBackground: "#FFF4F4",
          textMonthFontWeight: "bold",
          textDayFontSize: 14,
          textDayHeaderFontSize: 14,
          textSectionTitleColor: "#000000",
          todayTextColor: "#EAA4FA",
          arrowColor: "#000",
          textMonthFontSize: 18,
        }}
      />
    </View>
  );
};

export default LastPeriodDate;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginVertical: 30,
    marginHorizontal: -15,
    backgroundColor: "#FFF4F4",
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  step: {
    fontWeight: "600",
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
  },
});
