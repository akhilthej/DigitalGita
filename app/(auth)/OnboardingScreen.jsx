import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { images } from '../../constants';

const OnboardingScreen = () => {
  return (
    <View className='flex-1 bg-white'>
      <SafeAreaView className='flex-1'>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1  items-center">
            <Image
              source={images.welcomescreenlogo}
              className="max-w-[280px] w-full h-[250px]"
              resizeMode="contain" 
            />

            <Text className="text-[18px] text-black font-bold text-center">
              Let's Start
            </Text>
            <Text className="text-[24px] text-black font-bold text-center">
              Building your Brand
            </Text>
            <Text className="text-xs text-gray-800 text-center mt-2">
              A Knowledge place for all your Digital Needs. {"\n"}
            </Text>

            <TouchableOpacity 
              onPress={() => router.push('signup')} 
              className='flex-row drop-shadow-2xl max-w-[200px] mx-auto items-center bg-primary rounded-2xl mt-5'
            >
              <Text className='text-[13px] w-[150px] text-center font-bold text-white p-5'>
                Get Started
              </Text>
              <Icon
                name="log-in-outline"
                size={30}
                color='white'
                style={{ marginLeft: 'auto', marginRight: 20 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Image 
          source={images.welcomescreen}  
          className="absolute w-full h-[450px] -z-1 bottom-0" 
          style={{ zIndex: -1 }}
        />

        <Text className="text-xs font-light text-gray-700 text-center pb-10">
          www.digitalgita.com{"\n"}
          &copy; 2024 Cyber Space Digital. All rights reserved.
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default OnboardingScreen;
