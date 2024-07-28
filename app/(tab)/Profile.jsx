import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <View className="flex-1" >

      <SafeAreaView className='flex-1'>
        <ScrollView>
          <View className="justify-center items-center mb-4">
            <View className="flex flex-col items-center w-full rounded-xl drop-shadow-2xl">
              <Image 
                source={{ uri: userInfo?.imageUrl || 'https://via.placeholder.com/40' }} // Default image if userInfo or imageUrl is not available
                className="rounded-full w-14 h-14"
              />
              <Text className="text-2xl font-bold text-black mt-2">{userInfo?.name || 'Guest'}</Text>
              <View className='flex-row'>
              <Text className="text-md text-black mt-2">{userEmail}</Text>
              <Text className="text-md text-black font-bold mt-2"> | </Text>
              <Text className="text-md text-black mt-2">{userPhonenumber}</Text>
              </View>
            </View>
          </View>



<View className="flex m-2 px-4 space-y-5">

<View className='border-t border-gray-300 w-full'></View>
<View className='flex'>
<Text className='text-xl font-medium'>Your Activity</Text>
<Text className='text-sm '>Review your activity and orders that you placed</Text>
</View>

<TouchableOpacity onPress={() => router.push('MyBusiness')} className="flex-row items-center text-center ">
            <Icon
                name="basket-outline"
                size={23}
                color='black' className='pr-3'/>

              <Text className="text-[16px] text-black">
              My Businesses
              </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => router.push('Orders')} className="flex-row items-center text-center ">
            <Icon
                name="basket-outline"
                size={23}
                color='black' className='pr-3'/>

              <Text className="text-[16px] text-black">
              Orders
              </Text>
            </TouchableOpacity>


<View className='border-t border-gray-300 w-full'></View>

            <View className='flex'>
<Text className='text-xl font-medium'>Payments</Text>
<Text className='text-sm '>Manage your Payments info and activity.</Text>
</View>
  <TouchableOpacity onPress={() => router.push('ProfileEdit')} className="flex-row items-center text-center">
            <Icon
                name="cash-outline"
                size={23}
                color='black' className='pr-3'/>

              <Text className="text-[16px] text-black ">
                Payouts
              </Text>
            </TouchableOpacity>


<View className='border-t border-gray-300 w-full'></View>

            <View className='flex'>
<Text className='text-xl font-medium'>Your Information</Text>
<Text className='text-sm '>Manage your Brandify information.</Text>
</View>

            <TouchableOpacity onPress={() => router.push('ProfileEdit')} className="flex-row items-center  text-center">
            <Icon
                name="person-outline"
                size={23}
                color='black' className='pr-3'/>

              <Text className="text-[16px] text-black ">
                Profile Edit
              </Text>
            </TouchableOpacity>



            <TouchableOpacity onPress={() => router.push('Settings')} className="flex-row items-center   text-center ">
            <Icon
                name="settings-outline"
                size={23}
                color='black' className='pr-3'/>

              <Text className="text-[16px] text-black">
              Settings
              </Text>
            </TouchableOpacity>



            <View className='border-t border-gray-300 w-full'></View>

            <View className='flex'>
<Text className='text-xl font-medium'>Help Center</Text>
<Text className='text-sm '>Get in touch, Need more help ?</Text>
</View>

            <TouchableOpacity onPress={() => router.push('ProfileEdit')} className="flex-row items-center  text-center">
            <Icon
                name="call-outline"
                size={23}
                color='black' className='pr-3'/>

              <Text className="text-[16px] text-black ">
                Contact us
              </Text>
            </TouchableOpacity>



            <TouchableOpacity onPress={() => router.push('Settings')} className="flex-row items-center   text-center ">
            <Icon
                name="bug-outline"
                size={23}
                color='black' className='pr-3'/>

              <Text className="text-[16px] text-black">
              Report a Bug
              </Text>
            </TouchableOpacity>


</View>




<View className="justify-center items-center px-4">
            <TouchableOpacity onPress={handleLogout} className="flex-row items-center  mt-3 rounded-2xl py-2 px-5 border">
              <Text className="text-[13px] font-bold text-black">
                Logout
              </Text>
              <Icon
                name="log-in-outline"
                size={23}
                color='black'
                style={{ marginLeft: 'auto', padding:2 }}
              />
            </TouchableOpacity>
</View>

          <Text className="text-xs font-light text-gray-700 mt-2 text-center">
            www.digitalgita.com | www.cyberspacedigital.in {"\n"}
            &copy; 2024 Cyber Space Digital. All rights reserved.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
