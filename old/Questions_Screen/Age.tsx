import React from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";

const AgeInput = ({ inputValue, setInputValue }) => {
  return (
    <KeyboardAvoidingView>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "grey",
          backgroundColor: "rgba(222, 222, 222, 1)",
          borderRadius: 20,
          padding: 16,
          marginBottom: 24,
          fontSize: 16,
        }}
        value={inputValue}
        keyboardType="numeric"
        onChangeText={setInputValue}
        placeholder="Type your answer here"
      />
    </KeyboardAvoidingView>
  );
};

export default AgeInput;
