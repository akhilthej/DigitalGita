import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { images } from '../../constants';
import { useRouter } from 'expo-router';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      console.log('Signup Data:', { name, email, password, phone });
  
      const response = await axios.post(
        'https://digitalgita.cyberspacedigital.in/api/signup.php',
        { name, email, password, phone },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('Signup Success:', response.data);
      router.push("/signin");
    } catch (error) {
      console.error('Signup Error:', error.message);
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
              Join Now
            </Text>
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
            <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
              <Text style={styles.signupText}>
                Signup
              </Text>
              <Icon
                name="log-in-outline"
                size={30}
                color='white'
                style={{ marginLeft: 'auto', marginRight: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/signin")}>
              <Text style={styles.signInText}>
                Already a user? Sign-in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#000000" style="light" />
        <Text style={styles.footerText}>
          www.digitalgita.com | www.cyberspacedigital.in {"\n"}
          &copy; 2024 Cyber Space Digital. All rights reserved.
        </Text>
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
  signInText: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    padding: 5,
  },
  footerText: {
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'center',
    color: 'gray',
    marginTop: 20,
  },
});

export default Signup;
