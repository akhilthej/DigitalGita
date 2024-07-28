import React, { useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../constants';
import { router } from 'expo-router';

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sex, setSex] = useState("Male"); // Default to "Male"
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    setError(""); // Reset error state before starting
    try {
      const response = await fetch('https://digitalgita.cyberspacedigital.in/api/CRUD.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          emailaddress: emailAddress,
          phonenumber: phoneNumber,
          sex: sex,
          role: 'client',
          password: password,
        })
      });

      const textResponse = await response.text(); // Get response text
      console.log("Response status:", response.status); // Log response status
      console.log("Response text:", textResponse); // Log response text for debugging

      if (response.ok) {
        if (textResponse) {
          try {
            const data = JSON.parse(textResponse); // Try to parse response as JSON
            if (data.status === 'success') {
              // Navigate to sign-in page upon successful signup
              router.push('signin');
            } else {
              setError(data.message); // Set error message received from the server
            }
          } catch (jsonError) {
            console.error("JSON parse error:", jsonError);
            setError('An unexpected error occurred. Please try again.');
          }
        } else {
          setError('Received empty response from the server.');
        }
      } else {
        setError('Failed to sign up. Please try again.');
      }
    } catch (err) {
      console.error("Sign-up error", err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <View className="flex-1" >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className="w-full justify-center items-center px-4">
              <Image
                source={images.welcomescreenlogo}
                className="max-w-[280px] w-full h-[100px]"
                resizeMode="contain"
              />

              <View>
                <Text className="text-lg text-black font-bold text-center">
                  Let's Start
                </Text>
                <Text className="text-xl text-black font-bold text-center">
                  Building your Brand
                </Text>
              </View>

              <Text className="text-xs text-gray-500 mt-2 text-center">
                A Knowledge place for all your Digital Needs. {"\n"}
              </Text>

              <View className="w-full mt-5">
                <TextInput
                  value={firstName}
                  placeholder="First Name"
                  onChangeText={setFirstName}
                  className="border-b border-gray-500 py-2 text-base text-black"
                  placeholderTextColor="gray"
                />
                <TextInput
                  value={lastName}
                  placeholder="Last Name"
                  onChangeText={setLastName}
                  className="border-b border-gray-500 py-2 text-base text-black mt-5"
                  placeholderTextColor="gray"
                />
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Email"
                  onChangeText={setEmailAddress}
                  className="border-b border-gray-500 py-2 text-base text-black mt-5"
                  placeholderTextColor="gray"
                />
                <TextInput
                  value={phoneNumber}
                  placeholder="Phone Number"
                  onChangeText={setPhoneNumber}
                  className="border-b border-gray-500 py-2 text-base text-black mt-5"
                  placeholderTextColor="gray"
                />
                {/* Removed the TextInput for "Sex" field */}
                <TextInput
                  value={password}
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                  className="border-b border-gray-500 py-2 text-base text-black mt-5"
                  placeholderTextColor="gray"
                />
                {error !== "" && (
                  <Text className="text-sm text-red-500 mt-2 text-center">
                    {error}
                  </Text>
                )}

                <TouchableOpacity onPress={() => router.push('TermsConditions')} >
                  <Text className="text-xs text-center  text-black my-2">
                    ✓ I accept the following <Text className="text-xs text-center font-bold text-primary my-2">Terms & Conditions </Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onSignUpPress}
                  className="flex-row items-center bg-primary mt-2 rounded-full"
                >
                  <Text className="text-xs w-full font-bold text-white py-3 text-center">
                    Sign Up
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push('signin')} >
                  <Text className="text-xs text-center font-bold text-black py-3">
                    Already an Existing User?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <StatusBar backgroundColor="#000000" style="light" />

        <Text className="text-xs font-light text-gray-500 mt-2 text-center pb-5">
          www.digitalgita.com | www.cyberspacedigital.in {"\n"}
          &copy; 2024 Cyber Space Digital. All rights reserved.
        </Text>
      </SafeAreaView>
    </View>
  );
};

export default Signup;