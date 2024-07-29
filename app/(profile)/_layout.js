import { Slot, Stack, SplashScreen } from "expo-router";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { router } from "expo-router";

const AuthLayout = ({}) => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0064e0",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push("Profile")}>
            <Text style={{ color: "#ffffff", marginLeft: 15 }}>Back</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="MyBusiness"
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: 'My Business',
          
        }}
      />
      <Stack.Screen
        name="ProfileEdit"
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: 'Edit Profile',
          
        }}
      />
      <Stack.Screen
        name="Settings"
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: 'Settings',
          
        }}
      />
      <Stack.Screen
        name="Orders"
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: 'Orders',
          
        }}
      />
        <Stack.Screen
        name="(orders)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AuthLayout;
