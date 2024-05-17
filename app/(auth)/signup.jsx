import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { images } from '../../constants';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = () => {
    // Handle the signup logic here
    console.log('Signup Details:', { name, email, password, phone });
    // After handling signup, navigate to home
    router.push("/Home");
  };

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
              className="max-w-[280px] w-full h-[80px]"
              resizeMode="contain"
            />

            <View className="relative mt-5">
              <Text className="text-[18px] font-pmedium text-black font-bold text-center">
                Join Now
              </Text>
            </View>

            <View className="w-full mt-10">
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
              />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>

            <TouchableOpacity onPress={handleSignup} className='flex-row items-center bg-black mt-10 rounded-2xl'>
              <Text className='text-[13px] w-[150px] text-center font-bold text-white p-5'>
                Signup
              </Text>
              <Icon
                name="log-in-outline"
                size={30}
                color='white'
                style={{ marginLeft: 'auto', marginRight: 20 }}
              />
            </TouchableOpacity>



            <TouchableOpacity onPress={() => router.push("/signin")} className='flex-row items-center bg-teal-900 mt-10 rounded-2xl'>
              <Text className='text-[13px] w-[150px] text-center font-bold text-white p-5'>
                Signin
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

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default Signup;