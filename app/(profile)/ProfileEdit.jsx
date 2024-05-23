import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../hooks/AuthContext';
import axios from 'axios';

const ProfileEdit = () => {
  const { user, loading, setUser } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [sex, setSex] = useState(user?.sex || '');
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    const name = `${firstName} ${lastName}`;

    if (!name || !email || !phoneNumber || !sex || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    setUpdating(true);

    try {
      const response = await axios.put('https://digitalgita.cyberspacedigital.in/api/CRUD.php', {
        name,
        emailaddress: email,
        phonenumber: phoneNumber,
        sex,
        password,
      });

      if (response.data.status === 'success') {
        Alert.alert('Success', 'Profile updated successfully');
        setUser({
          ...user,
          name,
          email,
          phoneNumber,
          sex,
        });
      } else {
        Alert.alert('Error', response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <LinearGradient
      colors={['#f9faf8', '#dbe9db']}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={false} // Prevents editing of email field
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Sex"
          value={sex}
          onChangeText={setSex}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
          disabled={updating || loading}
        >
          <Text style={styles.buttonText}>{updating ? 'Updating...' : 'Update Profile'}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#134e4a',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileEdit;
