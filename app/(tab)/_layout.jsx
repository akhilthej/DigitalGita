import { Tabs } from "expo-router";
import { Image, Text, View, Platform } from "react-native";
import { icons } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BusinessBar from "../../components/homecomponents/BusinessBar";

const TabIcon = ({ icon, color, name, focused, iconSize = 30, nameSize = 10 }) => {
  const adjustedIconSize = focused ? iconSize + 5 : iconSize;
  return (
    <View style={{ alignItems: "center", justifyContent: "center", gap: 1 }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{ width: adjustedIconSize, height: adjustedIconSize }}
      />
      <Text style={{ color: color, fontSize: nameSize }}>{name}</Text>
    </View>
  );
};

const TabLayout = () => {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0064e0",
          tabBarInactiveTintColor: "#737373",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ffffff",
            height: isIOS ? 80 : 64, // Adjust height for iOS and Android
            paddingBottom: insets.bottom || (isIOS ? 15 : 5), // Adjust padding based on platform
            paddingTop: 10,
            borderTopWidth: 0,
            elevation: 2, // Add elevation for Android shadow effect
            shadowOffset: { width: 0, height: 2 },
            shadowColor: "#000",
            shadowOpacity: 0.2,
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Services"
          options={{
            title: "Services",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.services}
                color={color}
                name="Services"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Grow"
          options={{
            title: "Grow",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.rocket}
                color={color}
                name="Grow"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="DealsOffers"
          options={{
            title: "DealsOffers",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.deals}
                color={color}
                name="DealsOffers"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
