import { Image } from "expo-image";
import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import name1 from "../../assets/images/name1.png";
import name2 from "../../assets/images/name2.png";

const NameInput = ({ current, handleAnswer, inputValue, setInputValue }) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
        <View
          style={{
            flex: 2 / 4,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={name1}
            style={{ width: " 100%", height: "100%", resizeMode: "cover" }}
          />
        </View>
        <View style={styles.container}>
          {/* Question and Input */}
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.questionText}>{current.question}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 24,
              }}
            >
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: "grey",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 24,
                  fontSize: 16,
                  width: "90%",
                  color: "#000",
                }}
                value={inputValue}
                onChangeText={setInputValue}
                placeholderTextColor={"grey"}

                // placeholder="Type your answer here"
              />
            </View>
            <View
              style={{
                alignItems: "flex-end",
                paddingHorizontal: 24,
              }}
            >
              <TouchableOpacity style={styles.button} onPress={handleAnswer}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            <Image
              source={name2}
              style={{ width: " 70%", height: "70%", resizeMode: "contain" }}
            />
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    paddingTop: 48,
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
    backgroundColor: "#FEF7E5",
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
    // marginHorizontal: 30,
    fontSize: 30,
    marginBottom: 20,
    // fontWeight: "500",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#655950",
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: 110,
    height: 40,
    borderRadius: 10,
    marginBottom: "20%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});

export default NameInput;
