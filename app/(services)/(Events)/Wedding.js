import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../hooks/AuthContext'; // Adjust the path to your AuthContext
import { images } from '../../../constants';

const Wedding = () => {
  const { user, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [category] = useState("Events");
  const [product] = useState("Wedding");
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://digitalgita.cyberspacedigital.in/api/CRUD.php?emailaddress=${user?.email}`);
        const data = await response.json();
        
        if (data) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const sendToDiscord = async () => {
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1243829819259621386/S49cIK5lx206x2UWH_ELEHKlAcHLIefPsqgBjGcT7uFubCVWOZM2HhXlo-Ju9Oa0aIgM'; // Replace with your Discord webhook URL

    const message = {
      content: `Quotation Request for Wedding Services\n\nEmail: ${userInfo?.emailaddress}\nPhone: ${userInfo?.phonenumber}`,
    };

    try {
      const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        console.log('Quotation request sent to Discord successfully');
      } else {
        console.error('Failed to send quotation request to Discord');
      }
    } catch (error) {
      console.error('Error sending quotation request to Discord:', error);
    }
  };

  const handleSubmit = async () => {
    setMessage(""); // Clear any previous messages

    try {
      const response = await fetch('https://digitalgita.cyberspacedigital.in/api/Quotation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailaddress: userInfo?.emailaddress,
          phonenumber: userInfo?.phonenumber, // Include the phonenumber field
          category: category,
          product: product,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setMessage('Quotation request sent successfully.');
        Alert.alert('Success', 'Quotation request sent successfully.');
        sendToDiscord(); // Call function to send details to Discord
      } else {
        setMessage('Failed to send quotation request.');
        Alert.alert('Error', 'Failed to send quotation request.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Image
        source={images.WeddingCoverImage}
        className="w-full h-60"
        resizeMode="cover"
      />

      <ScrollView>
        <Text className="text-2xl font-bold mb-4 text-center">Request a Quotation for Wedding Services</Text>

        <TouchableOpacity onPress={handleSubmit} className='flex-row drop-shadow-2xl max-w-[200px] mx-auto items-center bg-primary rounded-2xl mt-5'>
          <Text className='text-[13px] text-center font-bold text-white p-5'>
            Get Quotation
          </Text>
        </TouchableOpacity>

        {message ? <Text className="text-green-600 font-bold mt-4 text-center">{message}</Text> : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wedding;
