import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@clerk/clerk-expo';

const Settings = () => {
  const { user } = useUser();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUpdatePhoneNumber = async () => {
    try {
      const response = await fetch('https://digitalgita.cyberspacedigital.in/api/settingsupdate.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
          phoneNumber: phoneNumber,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Phone number updated successfully
        setSuccessMessage('Phone number updated successfully.');
        setError('');
      } else {
        // Error updating phone number
        setError(data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating phone number:', error);
      setError('An error occurred while updating the phone number.');
      setSuccessMessage('');
    }
  };

  return (
    <LinearGradient
      colors={['#f9faf8', '#dbe9db']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Update Phone Number</Text>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your new phone number"
            style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 }}
          />
          {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
          {successMessage ? <Text style={{ color: 'green', marginBottom: 10 }}>{successMessage}</Text> : null}
          <TouchableOpacity onPress={handleUpdatePhoneNumber} style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Update Phone Number</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
