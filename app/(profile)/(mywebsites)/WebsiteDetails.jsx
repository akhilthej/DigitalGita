import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

const WebsiteDetails = () => {
  const { id, email } = useLocalSearchParams();
  const [website, setWebsite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWebsiteDetails = async () => {
      try {
        const response = await axios.get(`https://digitalgita.cyberspacedigital.in/api/MyWebsites/website_details.php?id=${id}&email=${email}`);
        setWebsite(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsiteDetails();
  }, [id, email]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-xl">Error: {error}</Text>
      </View>
    );
  }

  if (!website) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl">No data available</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5">
      <Text className="text-2xl font-bold mb-2">Website Details</Text>
      <Text className="text-lg mb-2">URL: {website.url}</Text>
      <Text className="text-lg mb-2">Owner: {website.owner}</Text>
      <Text className="text-lg mb-2">Status: {website.status}</Text>
      <Text className="text-lg mb-2">Last Checked: {website.last_checked}</Text>
    </View>
  );
};

export default WebsiteDetails;
