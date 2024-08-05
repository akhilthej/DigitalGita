import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

const MyWebsitesLayout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push("Profile")}>
            <Text style={{ color: "#000000", marginLeft: 15 }}>Back</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="AllWebsites" />
      <Stack.Screen name="WebsiteDetails" />
    </Stack>
  );
};

export default MyWebsitesLayout;
