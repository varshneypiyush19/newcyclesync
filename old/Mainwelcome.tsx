import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const mainwelcome = ({ current, onNext }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FEFDE9" }}>
      {/* Top image section */}
      <View
        style={{
          flex: 3 / 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={current.image}
          style={{ width: 270, height: 270, resizeMode: "contain" }}
        />
      </View>

      {/* White rounded bottom section */}
      <View
        style={{
          // backgroundColor: "#FFFFFF",
          borderTopLeftRadius: 125,
          borderTopRightRadius: 125,
          // borderTopStartRadius: 125,
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
          {current.heading}
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
          {current.subHeading}
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: 50,
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 30,
              paddingVertical: 5,
              backgroundColor: "#EAA4FA",
              borderRadius: 50,
            }}
            onPress={onNext}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Next
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingHorizontal: 30,
              paddingVertical: 5,
              borderWidth: 2,
              borderRadius: 50,
              backgroundColor: "#fff",
              justifyContent: "center",
              borderColor: "#EAA4FA",
            }}
            onPress={() => router.push("/LoginSignup")}
          >
            <Text
              style={{ color: "#EAA4FA", fontSize: 16, fontWeight: "bold" }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default mainwelcome;
