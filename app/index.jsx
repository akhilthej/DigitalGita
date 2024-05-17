import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { images } from '../constants';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const index = () => {
  return (
    <LinearGradient
      colors={['#f9faf8',  '#dbe9db']} // Set your gradient colors here
      style={{ flex: 1 }}
    >
      <SafeAreaView className='h-full'>
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="w-full flex justify-center items-center h-[85vh] px-4">
            <View style={{ position: 'absolute', top: 50, left: 30 }}>
              {/* Other content if needed */}
            </View>

            <Image
              source={images.welcomescreenlogo}
              className="max-w-[280px] w-full h-[298px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-[18px] font-pmedium text-black font-bold text-center">
                Let's Start
              </Text>
              <Text className="text-[24px] font-pblack text-black font-bold text-center">
                Building your Brand
              </Text>
            </View>

            <Text className="text-xs font-pregular text-gray-800 mt-2 text-center">
              A Knowledge place for all your Digital Needs. {"\n"}
            </Text>

            <TouchableOpacity onPress={() => router.push("/Home")} className='flex-row items-center bg-black mt-10 rounded-2xl'>
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


            <TouchableOpacity onPress={() => router.push("/signup")} className='flex-row items-center bg-teal-900 mt-10 rounded-2xl'>
              <Text className='text-[13px] w-[150px] text-center font-bold text-white p-5'>
                Join Now
              </Text>
             
            </TouchableOpacity>

          </View>
        </ScrollView>

        <StatusBar backgroundColor="#000000" style="light" />

        <Text className="text-xs font-light text-gray-700 mt-2 text-center pb-10">
          www.digitalgita.com | www.cyberspacedigital.in {"\n"}
          &copy; 2024 Cyber Space Digital. All rights reserved.
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default index;
