import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const Header = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleProfileNavigation = () => {
    router.push('/Profile');
  };

  return (
    <View className="flex flex-row py-3 px-6 items-center bg-teal-800">
      <TouchableOpacity onPress={handleProfileNavigation}>
        <Image
          source={{ uri: user?.imageUrl }}
          className="rounded-full w-10 h-10"
        />
      </TouchableOpacity>

      <View className='pl-2'>
        <TouchableOpacity onPress={handleProfileNavigation}>
          <Text className="text-[13px] text-white">Welcome</Text>
          <Text className="text-[16px] font-bold text-white">{user?.fullName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
