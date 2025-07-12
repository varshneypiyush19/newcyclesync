import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebaseConfig";
import AgeInput from "./Questions_Screen/Age";
import KnownConditionsScreen from "./Questions_Screen/ConditionsOrHistory";
import CycleRegularity from "./Questions_Screen/CycleRegularity";
import DailyRemindersScreen from "./Questions_Screen/DailyReminder";
import HealthGoalsScreen from "./Questions_Screen/HealthGoal";
import Language from "./Questions_Screen/Language";
import LastPeriodDate from "./Questions_Screen/LastPeriodDate";
import NameInput from "./Questions_Screen/NameInput";
import PeriodLength from "./Questions_Screen/PeriodLength";

const questions = [
  { type: "language", question: "Select your preferred language" },
  { type: "name", question: "What is your name ?" },
  { type: "age", question: "How old are you ?" },
  { type: "lastPeriod", question: "When did your last Period start ?" },
  {
    type: "periodLength",
    question: "How long does your period usually last ?",
  },
  { type: "cycleRegularity", question: "How regular are your periods?" },
  {
    type: "healthGoal",
    question: "What do you want help with? (Select all that apply)",
  },
  {
    type: "ConditionsOrHistory",
    question: "Do you have or suspect any of the following?",
  },
  {
    type: "dailyReminders",
    question: "Would you like daily reminders and wellness tips?",
  },
];

export default function QuestionFlow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const current = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = (currentIndex + 1) / totalQuestions;
  console.log("home");
  const handleAnswer = async () => {
    const updatedAnswers = [...answers];
    let answerToStore = inputValue;
    if (Array.isArray(inputValue)) {
      answerToStore = inputValue.join(", "); // or any separator you want
    }
    updatedAnswers[currentIndex] = answerToStore;
    setAnswers(updatedAnswers);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
      setInputValue(updatedAnswers[currentIndex + 1] || "");
    } else {
      setLoading(true);
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User not authenticated. Please log in again.");
        }
        await setDoc(doc(db, "questionnaires", user.uid), {
          answers: updatedAnswers,
          userId: user.uid,
          submittedAt: new Date().toISOString(),
        });
        // forcefully wait and re-read the document to confirm
        const saved = await getDoc(doc(db, "questionnaires", user.uid));
        if (saved.exists()) {
          router.replace("/Main");
        } else {
          Alert.alert(
            "Error",
            "Could not confirm your data was saved. Please try again."
          );
        }

        // await setDoc(doc(db, "questionnaires", user.uid), {
        //   answers: updatedAnswers,
        //   submittedAt: new Date().toISOString(),
        // });
        // console.log("✅ Questionnaire saved successfully!");
        // router.replace("/Main"); // Use replace so user can't go back to questions
      } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        console.error("❌ Failed to save questionnaire:", err);
        Alert.alert("Submission Error", message);
      } finally {
        setLoading(false); // Hide loading indicator in all cases
      }
    }
  };
  const handleBack = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setInputValue(answers[prevIndex] || "");
    }
  };

  const renderQuestionComponent = () => {
    switch (current.type) {
      case "language":
        return (
          <Language inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "name":
        return (
          <NameInput inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "age":
        return (
          <AgeInput inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "lastPeriod":
        return (
          <LastPeriodDate
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "periodLength":
        return (
          <PeriodLength inputValue={inputValue} setInputValue={setInputValue} />
        );
      case "cycleRegularity":
        return (
          <CycleRegularity
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "healthGoal":
        return (
          <HealthGoalsScreen
            inputValue={inputValue || []}
            setInputValue={setInputValue}
          />
        );
      case "ConditionsOrHistory":
        return (
          <KnownConditionsScreen
            inputValue={inputValue || []}
            setInputValue={setInputValue}
          />
        );
      case "dailyReminders":
        return (
          <DailyRemindersScreen
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      default:
        return null;
    }
  };
  if (loading)
    return (
      <Modal transparent={true} animationType="fade">
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#EAA4FA" />
          <Text style={{ marginTop: 10, color: "#666" }}>
            Saving your data...
          </Text>
        </View>
      </Modal>
    );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.backArrow}>
            {currentIndex > 0 && (
              <TouchableOpacity onPress={handleBack}>
                <Ionicons name="arrow-back" size={28} color="#333" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${progress * 100}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{totalQuestions}
          </Text>
        </View>

        {/* Question and Input */}
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.questionText}>{current.question}</Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {renderQuestionComponent()}
          </View>
        </View>

        {/* Button */}
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={handleAnswer}>
            <Text style={styles.buttonText}>
              {currentIndex === totalQuestions - 1 ? "Finish" : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
    backgroundColor: "#fff",
  },
  topBar: {
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 12,
    height: 28,
  },
  backArrow: {
    width: 24,
  },
  progressContainer: {
    flex: 1,
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 50,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#EAA4FA",
  },
  progressText: {
    fontSize: 14,
    textAlign: "right",
    color: "#666",
  },
  questionText: {
    marginTop: 20,
    marginHorizontal: 30,
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#EAA4FA",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 180,
    borderRadius: 50,
    marginBottom: "20%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
