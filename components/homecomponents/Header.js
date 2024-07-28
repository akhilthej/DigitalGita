import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthContext"; // Adjust the path if needed
import { useRouter } from "expo-router";
import BusinessBar from "./BusinessBar";

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `https://digitalgita.cyberspacedigital.in/api/CRUD.php?emailaddress=${user?.email}`
        );
        const data = await response.json();

        if (data) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  const handleProfileNavigation = () => {
    router.push("/Profile");
  };

  return (
    <SafeAreaView className="flex-0 bg-black" style={styles.safeArea}>
      <View
        className={`bg-white ${
          Platform.OS === "android" ? `pt-[${StatusBar.currentHeight}px]` : ""
        }`}
      >
        <View className="flex-row py-2 px-4 items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={handleProfileNavigation}>
              <Image
                source={{
                  uri: userInfo?.imageUrl || "https://via.placeholder.com/40",
                }} // Default image if userInfo or imageUrl is not available
                className="rounded-full w-10 h-10"
              />
            </TouchableOpacity>

            <View className="pl-2">
              <TouchableOpacity onPress={handleProfileNavigation}>
                <Text className="text-sm text-black">Welcome</Text>
                <Text className="text-base font-bold text-black">
                  {userInfo?.name || "Loading"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text className="text-blue-600 text-base font-bold">Help</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-white mt-20 rounded-2xl">
          <View className="w-72 p-5 rounded-lg items-center">
            <Text className="text-lg font-bold mb-2">Help Information</Text>
            <Text className="text-base text-center mb-4">
              Here you can provide some helpful information or instructions to
              the user.
            </Text>
            <TouchableOpacity
              className="py-2 px-4 bg-blue-600 rounded"
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text className="text-white text-base">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <BusinessBar/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default Header;
