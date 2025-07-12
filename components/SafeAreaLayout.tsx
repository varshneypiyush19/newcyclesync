import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeAreaLayout = ({ children }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: 16 }}
      edges={["top", "left", "right"]}
    >
      <StatusBar style="dark" />
      {/* <Text style={{ padding: 16, fontSize: 18 }}>Welcome to CycleSync </Text> */}
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaLayout;
