import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/AuthContext'; // Adjust the path to your AuthContext

const Profile = () => {
  const { user, signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://digitalgita.cyberspacedigital.in/api/CRUD.php?emailaddress=${user?.email}`);
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

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await signOut();
      console.log('Logout successful.');
      router.replace('/OnboardingScreen'); // Navigate to the onboarding screen after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Access the user's email address
  const userEmail = userInfo?.emailaddress || '';
  const userPhonenumber = userInfo?.phonenumber|| '';

  return (
    <LinearGradient
      colors={['#f9faf8', '#dbe9db']}
      className="flex-1"
    >
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
        <ScrollView>
          <View className="justify-center items-center px-4">
            <View className="flex flex-col items-center w-full bg-teal-800 rounded-xl p-4">
              <Image 
                source={{ uri: userInfo?.imageUrl || 'https://via.placeholder.com/40' }} // Default image if userInfo or imageUrl is not available
                className="rounded-full w-14 h-14"
              />
              <Text className="text-2xl font-bold text-white mt-2">{userInfo?.name || 'Guest'}</Text>
              <View className='flex-row'>
              <Text className="text-md text-white mt-2">{userEmail}</Text>
              <Text className="text-md text-white font-bold mt-2"> | </Text>
              <Text className="text-md text-white mt-2">{userPhonenumber}</Text>
              </View>
            </View>
          </View>



<View className="flex flex-row mx-auto">
            <TouchableOpacity onPress={() => router.push('ProfileEdit')} className="flex-row items-center bg-teal-900 mt-3 rounded-2xl p-3 m-2">
              <Text className="text-[13px] font-bold text-white">
                Profile Edit
              </Text>
              <Icon
                name="settings-outline"
                size={30}
                color='white'
                style={{ marginLeft: 'auto', padding:2 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('Settings')} className="flex-row items-center bg-teal-900 mt-3 rounded-2xl p-3 m-2">
              <Text className="text-[13px] font-bold text-white">
                Settings
              </Text>
              <Icon
                name="settings-outline"
                size={30}
                color='white'
                style={{ marginLeft: 'auto', padding:2 }}
              />
            </TouchableOpacity>
</View>

            <TouchableOpacity onPress={handleLogout} className="flex-row items-center bg-teal-900 mt-3 rounded-2xl p-3">
              <Text className="text-[13px] font-bold text-white">
                Logout
              </Text>
              <Icon
                name="log-in-outline"
                size={30}
                color='white'
                style={{ marginLeft: 'auto', padding:2 }}
              />
            </TouchableOpacity>


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
