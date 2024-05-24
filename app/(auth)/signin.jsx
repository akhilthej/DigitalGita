import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import { useAuth } from '../../hooks/AuthContext'; 
import { router } from 'expo-router';

const SignIn = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const onSignInPress = async () => {
    setLoading(true);
    const result = await signIn(emailAddress, password);
    setLoading(false);

    if (result.success) {
      router.push('/Home');
    } else {
      setError(result.message);
    }
  };

  return (
    <View className="flex flex-1">
      <SafeAreaView className="flex-1 mt-10">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="w-full flex justify-center items-center px-4">
              <Image
                source={images.welcomescreenlogo}
                className="max-w-[280px] w-full h-[100px]"
                resizeMode="contain"
              />

              <View className="relative mt-5">
                <Text className="text-lg text-black font-bold text-center">
                  Welcome Back
                </Text>
                <Text className="text-2xl text-black font-bold text-center">
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
                  className="border-b border-gray-400 py-3 text-lg text-black"
                  placeholderTextColor="gray"
                />
                <TextInput
                  value={password}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                  className="border-b border-gray-400 py-3 text-lg text-black mt-5"
                  placeholderTextColor="gray"
                />
                {error && <Text className="text-red-500 mt-2 text-center">{error}</Text>}
                <TouchableOpacity
                  onPress={onSignInPress}
                  className='flex-row items-center bg-teal-900 mt-10 rounded-2xl'
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" className='py-4' />
                  ) : (
                    <Text className='text-base w-full font-bold text-white py-4 text-center'>
                      Sign In
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => router.push('signup')}>
                <Text className='text-base text-center font-bold text-black py-5'>
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
    </View>
  );
};

export default SignIn;
