import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabIcon = ({ icon, color, name, iconSize = 25, nameSize = 10 }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: iconSize, height: iconSize }}
      />
      <Text style={{ color: color, fontSize: nameSize }}>
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#14b8a6",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#134e4a",
            height: 50 + insets.bottom,  // Add safe area insets to height
            paddingBottom: insets.bottom  // Ensure content is not cut off
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
          name="Wiki"
          options={{
            title: "Wiki",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.book}
                color={color}
                name="Wiki"
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
