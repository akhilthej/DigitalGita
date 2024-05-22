import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { images } from '../../constants';
import { useSignIn } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from 'expo-router';
import { useWarmUpBrowser } from "../../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  useWarmUpBrowser();
  const navigation = useNavigation();

  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });

      navigation.navigate('(tab)');
    } catch (err) {
      setError("Sign-in failed. Please check your credentials and try again.");
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
                  Welcome Back
                </Text>
                <Text className="text-[24px] text-black font-bold text-center">
                  Sign in to Your Account
                </Text>
              </View>

              <Text className="text-xs text-gray-800 mt-2 text-center">
                A Knowledge place for all your Digital Needs. {"\n"}
              </Text>

              <View className="w-full mt-5">
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
                {error && <Text className="text-red-500 mt-2 text-center">{error}</Text>}
                <TouchableOpacity
                  onPress={onSignInPress}
                  className='flex-row items-center bg-teal-900 mt-10 rounded-2xl'
                >
                  <Text className='text-[13px] w-full font-bold text-white p-5 text-center'>
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => router.push('signup')}>
                <Text className='text-[13px] text-center font-bold text-black p-5'>
                  Create a new Account?
                </Text>
              </TouchableOpacity>
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

export default SignIn;
