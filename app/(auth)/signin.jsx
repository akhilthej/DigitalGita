import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../constants';
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const Signin = () => {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });


  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);


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
        

          <Image
            source={images.welcomescreenlogo}
            className="max-w-[280px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-[18px]  text-black font-bold text-center">
              Let's Start
            </Text>
            <Text className="text-[24px]  text-black font-bold text-center">
              Building your Brand
            </Text>
          </View>

          <Text className="text-xs  text-gray-800 mt-2 text-center">
            A Knowledge place for all your Digital Needs. {"\n"}
          </Text>

          <TouchableOpacity onPress={onPress} className='flex-row items-center bg-teal-900 mt-10 rounded-2xl'>
          <Icon
              name="logo-google"
              size={30}
              color='white'
              style={{ marginLeft: 'auto', marginLeft: 20 }}
            />
             <Text className='text-[13px] w-[250px] font-bold text-white p-5'>
              Signin with Google
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

      <StatusBar backgroundColor="#000000" style="light" />

      <Text className="text-xs font-light text-gray-700 mt-2 text-center pb-10">
        www.digitalgita.com | www.cyberspacedigital.in {"\n"}
        &copy; 2024 Cyber Space Digital. All rights reserved.
      </Text>
    </SafeAreaView>
  </LinearGradient>
  );
};

export default Signin;
