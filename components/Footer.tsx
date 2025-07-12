import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FooterProps {
  symptoms?: string;
}

const Footer: React.FC<FooterProps> = ({ symptoms = "Tired" }) => {
  const router = useRouter();
  return (
    <View style={styles.bottomTab}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => router.push("/Main")}
      >
        <Ionicons name="home" size={20} color="rgba(254, 154, 240, 1)" />
        <Text style={styles.tabItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => router.push("/Calender")}
      >
        <MaterialCommunityIcons
          name="calendar"
          size={20}
          color="rgba(254, 154, 240, 1)"
        />
        <Text style={styles.tabItemText}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <FontAwesome5 name="users" size={20} color="rgba(254, 154, 240, 1)" />
        <Text style={styles.tabItemText}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <MaterialCommunityIcons
          name="chart-line"
          size={20}
          color="rgba(254, 154, 240, 1)"
        />
        <Text style={styles.tabItemText}>Predictions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
  },
  tabItem: {
    alignItems: "center",
  },
  tabItemText: {
    fontSize: 12,
    marginTop: 4,
    color: "rgba(254, 154, 240, 1)",
  },
});

export default Footer;
