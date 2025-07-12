import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebaseConfig";

export default function LogInScreen() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log("login page");
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // After login, check if questionnaire exists
      const user = auth.currentUser;
      if (user) {
        // router.replace("/Home");

        const questionnaireDoc = await getDoc(
          doc(db, "questionnaires", user.uid)
        );
        if (questionnaireDoc.exists()) {
          router.replace("/Main");
        } else {
          router.replace("/Home");
        }
      } else {
        Alert.alert("Error", "User not found after login.");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topSection}>
        <Text style={styles.title}>
          Log in to keep track of your cycle{"\n"}and maintain wellness
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            style={{ flex: 1 }}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.or}>– or log in with –</Text>

        <View style={styles.socialContainer}>
          {/* <Image
            source={require("../assets/images/apple.png")}
            style={styles.socialIcon}
          /> */}
          <Image
            source={require("../assets/images/google.png")}
            style={styles.socialIcon}
          />
          {/* <Image
            source={require("../assets/images/facebook.png")}
            style={styles.socialIcon}
          /> */}
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleLogin}>
          <Text style={styles.signUpText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Don{"'"}t have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => router.push("/Register")}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#655950",
  },
  topSection: {
    flex: 1 / 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#655950",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  bottomSection: {
    flex: 1,
    backgroundColor: "#FEFDE9",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 80,
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    paddingHorizontal: 15,
    // paddingVertical: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputPassword: {
    flex: 1,
  },
  or: {
    color: "#444",
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  signUpButton: {
    backgroundColor: "#655950",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 20,
  },
  signUpText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  footer: {
    color: "#000",
    fontSize: 14,
  },
  loginLink: {
    color: "#655950",
    fontWeight: "600",
  },
});
