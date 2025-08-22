import { Ionicons } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const mainwelcome = ({ current, onNext }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Top image section */}
      <View
        style={{
          flex: 2 / 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={current.image} style={{ resizeMode: "contain" }} />
      </View>

      {/* White rounded bottom section */}
      <View
        style={{
          backgroundColor: "#FEFDE9",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          // borderTopStartRadius: 125,
          paddingHorizontal: 30,
          paddingTop: 80,
          alignItems: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 45,
            // fontWeight: "bold",
            color: "#000000",
            textAlign: "center",
            marginBottom: 30,
            fontFamily: "Mulish",
            letterSpacing: 3,
          }}
        >
          {current.main}
        </Text>
        <Text
          style={{
            // paddingTop: 30,
            // paddingHorizontal: 35,
            fontSize: 24,
            color: "#000000",
            textAlign: "center",
            // lineHeight: 20,
          }}
        >
          {current.heading}
        </Text>
        <Text
          style={{
            paddingHorizontal: 30,
            fontSize: 24,
            color: "#000000",
            textAlign: "center",
          }}
        >
          {current.subHeading}
        </Text>

        <View style={{ alignItems: "center", backgroundColor: "#FEFDE9" }}>
          <Image source={current.image2} style={{ marginTop: 50 }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: 40,
            marginRight: 50,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 10,
              backgroundColor: "#655950",
              borderRadius: 20,
            }}
            onPress={onNext}
          >
            <Ionicons name="arrow-forward" size={40} color="#fff" />

            {/* <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Next
            </Text> */}
          </TouchableOpacity>

          {/* <TouchableOpacity
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
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default mainwelcome;
