import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Welcome1 from "../assets/images/bg1.png";
import logo from "../assets/images/newicon.png";
import { auth, db } from "../firebaseConfig";
import Mainwelcome from "./Mainwelcome";

export default function WelcomeLayout() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const Texts = [
    {
      image: Welcome1,
      image2: logo,
      main: "Hey There!!!",
      heading: "Welcome to CycleSync!",
      subHeading: "Sync with your inner rhythm",
    },
    // {
    //   image: Welcome1,
    //   heading: "Welcome to CYCLESYNC",
    //   subHeading: "Best app for effective period and cycle tracking",
    // },
    // {
    //   image: Welcome2,
    //   heading: "Tested and trusted",
    //   subHeading:
    //     "Recommended by over 300 OB-GYN for prioritizing women's health",
    // },
  ];
  // Show the first screen for now
  console.log("index page");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("auth state changed", user);
      if (user) {
        const questionnaireDoc = await getDoc(
          doc(db, "questionnaires", user.uid)
        );
        if (questionnaireDoc.exists()) {
          router.replace("/routes/Main");
        } else {
          router.replace("/routes/Home");
        }
      } else {
        setCheckingAuth(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleNext = () => {
    if (currentIndex < Texts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/auth/LoginSignup");
    }
  };

  if (checkingAuth) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FEFDE9",
        }}
      >
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <Mainwelcome current={Texts[currentIndex]} onNext={handleNext} />
    </SafeAreaView>
  );
}
