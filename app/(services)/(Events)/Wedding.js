import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../../hooks/AuthContext'; // Adjust the path to your AuthContext
import { fetchImages } from '../../../hooks/imagefetch';

import Icon from 'react-native-vector-icons/Ionicons';

const Wedding = () => {
  const { user, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [category] = useState("Events");
  const [product] = useState("Wedding");
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [weddingCoverImage, setWeddingCoverImage] = useState(null);

  useEffect(() => {
    const fetchWeddingCoverImage = async () => {
      try {
        const images = await fetchImages();
        const weddingCoverImages = images.filter(image => image.category === "EVENTS" && image.image_placement === "Wedding_cover");
        if (weddingCoverImages.length > 0) {
          setWeddingCoverImage(weddingCoverImages[0].url);
        }
      } catch (error) {
        console.error('Error fetching wedding cover image:', error);
      }
    };

    fetchWeddingCoverImage();
  }, []);


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
    <View className="flex-1">
     

      <ScrollView>
      <Image
        source={{ uri: weddingCoverImage }}
        className="w-full h-60"
        resizeMode="cover"
      />
      
      <Text className="text-lg font-bold text-center mt-2">
          Building your Brand on Google with
        </Text>
        <Text className="text-2xl font-bold text-center">
          GoogleAds
        </Text>
        <Text className="text-sm text-gray-800 text-center mt-2">
          Does Google Ads offer?
        </Text>
        <Text className="text-sm text-gray-800 text-center mt-2">
          Google Ads offers various advertising options for businesses to promote their products or services across Google's network, which includes Google Search, YouTube, Google Display Network, and other partner websites and apps. Some of the main advertising formats and options available through Google Ads include:
        </Text>
        <Text className="text-sm text-gray-800 text-center mt-2">
          • Search Ads: These are text ads that appear above or below the organic search results when people search for specific keywords on Google. Advertisers bid on keywords, and their ads are displayed to users who search for those terms.
        </Text>
        {/* Add more Text components for other points */}
        
        <View className='flex flex-row'>
        <TouchableOpacity onPress={handleSubmit} className='flex-row drop-shadow-2xl max-w-[200px] mx-auto items-center bg-primary rounded-2xl mt-5'>
          <Text className='text-[13px] text-center font-bold text-white p-5'>
            Get Quotation
          </Text>
          <Icon
    name="cart-outline" // Example of a different icon, change it to the desired icon name
    size={30}
    color='white'
    style={{ marginLeft: 'auto', marginRight: 20 }}
  />
        </TouchableOpacity>


</View>

<Text className="text-xs font-light text-gray-700 mt-2 text-center pb-10 bottom-0">
          www.digitalgita.com{"\n"}
          &copy; 2024 Cyber Space Digital. All rights reserved.
        </Text>


      

        {message ? <Text className="text-green-600 font-bold mt-4 text-center">{message}</Text> : null}
      </ScrollView>
    </View>
  );
};

export default Wedding;
