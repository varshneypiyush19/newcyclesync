import Footer from "@/components/Footer";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalendarList } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebaseConfig";

interface CalendarScreenProps {
  navigation?: any;
}

const CalendarScreen: React.FC<CalendarScreenProps> = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [lastFilledDate, setLastFilledDate] = useState<string>("");
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLastDate = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) return;
        const questionnaireDoc = await getDoc(
          doc(db, "questionnaires", user.uid)
        );
        if (questionnaireDoc.exists()) {
          const data = questionnaireDoc.data();
          const lastPeriod = data.answers?.[3];
          if (lastPeriod) {
            setLastFilledDate(lastPeriod);
            setSelectedDate(lastPeriod);
            setMarkedDates({
              [lastPeriod]: {
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
        }
      } catch (err) {
        Alert.alert("Error", "Failed to fetch last period date.");
      } finally {
        setLoading(false);
      }
    };
    fetchLastDate();
  }, []);

  const handleDayPress = (day: { dateString: string }) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    setMarkedDates({
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
    });
  };

  const handleSave = async () => {
    if (!selectedDate) return;
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) return;
      const questionnaireRef = doc(db, "questionnaires", user.uid);
      const questionnaireDoc = await getDoc(questionnaireRef);
      if (questionnaireDoc.exists()) {
        const data = questionnaireDoc.data();
        const answers = data.answers || [];
        answers[3] = selectedDate; // Update lastPeriod
        await updateDoc(questionnaireRef, { answers });
        setLastFilledDate(selectedDate);
        Alert.alert("Success", "Last period date updated.");
      } else {
        // If no questionnaire exists, create one
        await setDoc(questionnaireRef, {
          answers: ["", "", "", selectedDate],
          submittedAt: new Date().toISOString(),
        });
        setLastFilledDate(selectedDate);
        Alert.alert("Success", "Last period date saved.");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to save date.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fcd6f9" }}>
      <View style={styles.topBar}>
        <TouchableOpacity>
          {/* <Ionicons name="arrow-back" size={24} color="black" /> */}
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Calender</Text>

        {/* <Text style={styles.topBarTitle}>Edit Period</Text> */}
        <TouchableOpacity>
          <Ionicons name="calendar-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>
        {lastFilledDate ? (
          <Text style={styles.info}>Last filled date: {lastFilledDate}</Text>
        ) : (
          <Text style={styles.info}>No last period date found.</Text>
        )}
        <View style={styles.calendarCard}>
          <CalendarList
            current={selectedDate || new Date().toISOString().split("T")[0]}
            pastScrollRange={1}
            futureScrollRange={0}
            scrollEnabled={true}
            showScrollIndicator={false}
            markingType={"custom"}
            markedDates={markedDates}
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
        {/* <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? "Saving..." : "Save Date"}
          </Text>
        </TouchableOpacity> */}
      </View>
      <Footer />
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  calendarCard: {
    flex: 1,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: "white",
    overflow: "hidden",
  },
  wrapper: {
    flex: 1,
    marginVertical: 30,
    // margin: 20,
    // marginTop: 10,
    // marginBottom: 10,
    backgroundColor: "#FFF4F4",
    borderRadius: 14,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000",
  },
  info: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#EAA4FA",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
