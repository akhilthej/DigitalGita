import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../constants';
import * as WebBrowser from "expo-web-browser";
import { useSignUp } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

const Signup = () => {
  useWarmUpBrowser();
  const navigation = useNavigation();

  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
  
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
  
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("Sign-up error", err);
    }
  };
  
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
      navigation.navigate('(tab)');
    } catch (err) {
      console.error("Verification error", err);
    }
  };

  return (
    <LinearGradient
      colors={['#f9faf8', '#dbe9db']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="w-full flex justify-center items-center px-4">
              <Image
                source={images.welcomescreenlogo}
                className="max-w-[280px] w-full h-[298px]"
                resizeMode="contain"
              />

              <View className="relative mt-5">
                <Text className="text-[18px] text-black font-bold text-center">
                  Let's Start
                </Text>
                <Text className="text-[24px] text-black font-bold text-center">
                  Building your Brand
                </Text>
              </View>

              <Text className="text-xs text-gray-800 mt-2 text-center">
                A Knowledge place for all your Digital Needs. {"\n"}
              </Text>

              {!pendingVerification && (
                <View className="w-full mt-5">
                  <TextInput
                    value={firstName}
                    placeholder="First Name"
                    onChangeText={setFirstName}
                    className="border-b border-gray-400 py-2"
                  />
                  <TextInput
                    value={lastName}
                    placeholder="Last Name"
                    onChangeText={setLastName}
                    className="border-b border-gray-400 py-2"
                  />
                  <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Email"
                    onChangeText={setEmailAddress}
                    className="border-b border-gray-400 py-2"
                  />
                  <TextInput
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    className="border-b border-gray-400 py-2"
                  />
                  <TouchableOpacity
                    onPress={onSignUpPress}
                    className='flex-row items-center bg-teal-900 mt-10 rounded-2xl'
                  >
                    <Text className='text-[13px] w-full font-bold text-white p-5 text-center'>
                      Sign Up
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => router.push('signin')} >
                    <Text className='text-[13px] text-center font-bold text-black p-5'>
                      Already an Existing User?
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {pendingVerification && (
                <View className="w-full mt-5">
                  <TextInput
                    value={code}
                    placeholder="Verification Code"
                    onChangeText={setCode}
                    className="border-b border-gray-400 py-2"
                  />
                  <TouchableOpacity
                    onPress={onPressVerify}
                    className='flex-row items-center bg-teal-900 mt-10 rounded-2xl'
                  >
                    <Text className='text-[13px] w-full font-bold text-white p-5 text-center'>
                      Verify Email
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <StatusBar backgroundColor="#000000" style="light" />

        <Text className="text-xs font-light text-gray-700 mt-2 text-center pb-10">
          www.digitalgita.com | www.cyberspacedigital.in {"\n"}
          &copy; 2024 Cyber Space Digital. All rights reserved.
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Signup;
