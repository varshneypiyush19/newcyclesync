import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Mainwelcome = () => {
  const [agreed, setAgreed] = useState(false);
  const [agreed1, setAgreed1] = useState(false);

  const router = useRouter();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleLogin = () => {
    if (!agreed || !agreed1) {
      Alert.alert("Required", "You must agree terms and condition to proceed.");
      return;
    } // Call parent action
    else {
      router.push("/auth/Login");
    }
  };
  const handleRegister = () => {
    if (!agreed && !agreed1) {
      Alert.alert("Required", "You must agree terms and condition to proceed.");
      return;
    } else {
      router.push("/auth/Register");
    } // Call parent action
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#655950" }}>
      {/* Top image section */}
      <View
        style={{
          flex: 3 / 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../assets/images/welcome3.png")}
          style={{ width: 270, height: 270, resizeMode: "contain" }}
        />
      </View>

      {/* White rounded bottom section */}
      <View
        style={{
          backgroundColor: "#FEFDE9",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingHorizontal: 30,
          paddingTop: 80,
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: "#000000",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Your body and data is Priority
        </Text>
        <Text
          style={{
            paddingTop: 30,
            paddingHorizontal: 35,
            fontSize: 17,
            color: "#000000",
            textAlign: "center",
            lineHeight: 20,
          }}
        >
          CYCLESYNC makes accurate cycle predictions from your relevant data
        </Text>
        <View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 30,
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[styles.circle, agreed && styles.circleChecked]}
              onPress={() => setAgreed(!agreed)}
            >
              {agreed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>

            <Text style={styles.text}>
              I agree to allow <Text style={styles.bold}>CYCLESYNC</Text> app to
              have access to my health data to provide functions on the app
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: 5,
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[styles.circle, agreed1 && styles.circleChecked]}
              onPress={() => setAgreed1(!agreed1)}
            >
              {agreed1 && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>

            <Text style={styles.text}>
              I agree to the
              <Text style={styles.privacypolicy}> Privacy Policy </Text>and
              <Text style={styles.privacypolicy}> Terms of Use</Text>
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 50,
              paddingVertical: 5,
              backgroundColor: "#655950",
              borderRadius: 50,
            }}
            onPress={handleRegister}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 10,
              paddingHorizontal: 50,
              paddingVertical: 5,
              borderWidth: 2,
              borderRadius: 50,
              backgroundColor: "#fff",
              justifyContent: "center",
              borderColor: "#655950",
            }}
            onPress={handleLogin}
          >
            <Text
              style={{ color: "#655950", fontSize: 16, fontWeight: "bold" }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Mainwelcome;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#655950",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  privacypolicy: {
    // color: "#655950",
    fontWeight: "bold",
  },
  circleChecked: {
    backgroundColor: "#655950",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#A34BFE",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
