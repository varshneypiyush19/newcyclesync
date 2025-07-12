import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        statusBarStyle: "dark",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          // statusBarStyle: "dark",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginSignup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        options={{
          headerStyle: {
            backgroundColor: "#EAA4FA",
          },
          headerShadowVisible: false,
          title: "",
        }}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerStyle: {
            backgroundColor: "#EAA4FA",
          },
          headerShadowVisible: false, // iOS 15+, removes hairline

          title: "",
        }}
      />
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Main" options={{ headerShown: false }} />

      <Stack.Screen name="Calender" options={{ headerShown: false }} />
    </Stack>
  );
}
