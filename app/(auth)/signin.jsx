import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../constants';
import { useNavigation } from '@react-navigation/native';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignin = async () => {
    try {
      const response = await axios.post(
        'https://digitalgita.cyberspacedigital.in/api/signin.php',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Signin Success:', response.data);
      
      // Assuming response.data contains success information
      if (response.data.success) {
        // If signin successful, navigate to home or dashboard screen
        navigation.navigate('(tab)'); // Change 'Home' to your desired screen name
      } else {
        // If signin failed, display error message
        console.error('Signin Error:', response.data.message);
      }
    } catch (error) {
      console.error('Signin Error:', error.message);
    }
  };

  return (
    <LinearGradient
      colors={['#f9faf8',  '#dbe9db']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 20
          }}
        >
          <View>
            <Image
              source={images.welcomescreenlogo}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>
              Sign In
            </Text>
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
            <TouchableOpacity onPress={handleSignin} style={styles.signupButton}>
              <Text style={styles.signupText}>
                Sign In
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
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  logo: {
    maxWidth: 280,
    width: '100%',
    height: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  signupText: {
    fontSize: 13,
    fontWeight: 'bold',
    width: 150,
    textAlign: 'center',
    color: 'white',
  },
});

export default Signin;
