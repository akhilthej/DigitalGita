import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await signOut();
      console.log('Logout successful.');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#f9faf8', '#dbe9db']} // Set your gradient colors here
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
        <ScrollView>
          <View className="w-full flex justify-center items-center px-4">
            <View className="flex flex-col items-center w-full justify-center bg-teal-800 rounded-xl p-4">
              <Image 
                source={{ uri: user?.imageUrl }} 
                className="rounded-full w-14 h-14"
              />
              <Text className="text-2xl font-bold text-white mt-2">{user?.fullName}</Text>
              <Text className="text-md text-white mt-2">Phone Number</Text>
            </View>

            <TouchableOpacity onPress={handleLogout} className='flex-row items-center bg-teal-900 mt-10 rounded-2xl p-3'>
              <Text className='text-[13px] font-bold text-white'>
                Logout
              </Text>
              <Icon
                name="log-in-outline"
                size={30}
                color='white'
                style={{ marginLeft: 'auto', marginRight: 20 }}
              />
            </TouchableOpacity>
          </View>

          <Text className="text-xs font-light text-gray-700 mt-2 text-center">
            www.digitalgita.com | www.cyberspacedigital.in {"\n"}
            &copy; 2024 Cyber Space Digital. All rights reserved.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;
