import { router, useNavigation } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../firebaseConfig";
import AgeInput from "../Questions_Screen/Age";
import KnownConditionsScreen from "../Questions_Screen/ConditionsOrHistory";
import CycleRegularity from "../Questions_Screen/CycleRegularity";
import DailyRemindersScreen from "../Questions_Screen/DailyReminder";
import HealthGoalsScreen from "../Questions_Screen/HealthGoal";
import Height from "../Questions_Screen/Height";
import LastPeriodDate from "../Questions_Screen/LastPeriodDate";
import NameInput from "../Questions_Screen/NameInput";
import PeriodLength from "../Questions_Screen/PeriodLength";
import WeightInput from "../Questions_Screen/Weight";
const questions = [
  { type: "name", question: "What should I call you?" },
  { type: "age", question: "When were you born?" },
  { type: "height", question: "How tall are you?" },
  { type: "weight", question: "How much do you weigh? " },
  { type: "lastPeriod", question: "When did your last Period start ?" },
  {
    type: "periodLength",
    question: "How long do they usually last?",
  },
  { type: "cycleRegularity", question: "How regular are your periods?" },
  {
    type: "healthGoal",
    question: "What are your wellness goals?",
  },
  {
    type: "ConditionsOrHistory",
    question: "Anything else we should know?",
  },
  {
    type: "dailyReminders",
    question: "Would you like daily reminders and wellness tips?",
  },
  // { type: "language", question: "Select your preferred language" },
];

export default function QuestionFlow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [inputValue, setInputValue] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const current = questions[currentIndex];
  const totalQuestions = questions.length;
  const progress = (currentIndex + 1) / totalQuestions;
  console.log("home");
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleAnswer = async () => {
    // console.log("valanswer is this ", val);
    const updatedAnswers = [...answers];
    console.log("🧪 Answers going to Firestore:", updatedAnswers);
    // let answerToStore = inputValue;
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
          router.replace("/routes/Main");
        } else {
          Alert.alert(
            "Error",
            "Could not confirm your data was saved. Please try again."
          );
        }

        await setDoc(doc(db, "questionnaires", user.uid), {
          answers: updatedAnswers,
          submittedAt: new Date().toISOString(),
        });
        console.log("✅ Questionnaire saved successfully!", answers);
        router.replace("/routes/Main"); // Use replace so user can't go back to questions
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
      // case "language":
      //   return (
      //     <Language inputValue={inputValue} setInputValue={setInputValue} />
      //   );
      case "name":
        return (
          <NameInput
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "age":
        return (
          <AgeInput
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "height":
        return (
          <Height
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "weight":
        return (
          <WeightInput
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "lastPeriod":
        return (
          <LastPeriodDate
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "periodLength":
        return (
          <PeriodLength
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "cycleRegularity":
        return (
          <CycleRegularity
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        );
      case "healthGoal":
        return (
          <HealthGoalsScreen
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue || []}
            setInputValue={setInputValue}
          />
        );
      case "ConditionsOrHistory":
        return (
          <KnownConditionsScreen
            current={current}
            handleAnswer={handleAnswer}
            inputValue={inputValue || []}
            setInputValue={setInputValue}
          />
        );
      case "dailyReminders":
        return (
          <DailyRemindersScreen
            current={current}
            handleAnswer={handleAnswer}
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEF7E7" }}>
        {/* <Modal transparent={true} animationType="fade"> */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginTop: 10, color: "#666", fontSize: 26 }}>
            Getting things ready...
          </Text>
          <Image
            source={require("../../assets/images/screens/screen15.png")}
            style={{ width: "100%", height: "50%", resizeMode: "contain" }}
          />
          {/* <ActivityIndicator size="large" color="#EAA4FA" /> */}
        </View>
        {/* </Modal> */}
      </SafeAreaView>
    );
  return renderQuestionComponent();
}
