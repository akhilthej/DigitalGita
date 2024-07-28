import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const items = [
  { name: 'FB Meta', icon: 'facebook', route: 'GoogleAds' },
  { name: 'Google Ads', icon: 'google-ads', route: 'GoogleAds' },
  { name: 'YouTube', icon: 'youtube', route: 'GoogleAds' },
  { name: 'GM Business', icon: 'google-my-business', route: 'GoogleAds' },

  { name: 'Search Engine Optimization', icon: 'magnify', route: 'CreditScore' },
  { name: 'Social Media Management', icon: 'account-group', route: 'BikeLoan' },
  { name: 'Ecommerce Marketing', icon: 'shopping', route: 'MutualFundLoan' },
  { name: 'Influencer Marketing', icon: 'account-star', route: 'HomeLoan' },

];

// Helper function to split items into chunks of 4
const chunkItems = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const DigitalMarketingServicesList = () => {
  const router = useRouter(); // Get the router instance
  const chunkedItems = chunkItems(items, 4);

  return (
    <View className="bg-primary-100 p-4 rounded-lg m-2">
    


      <Text className="text-white text-md mb-4 font-bold text-center">Digital Marketing</Text>
      {chunkedItems.map((chunk, chunkIndex) => (
        <View key={chunkIndex} className="flex-row justify-between mb-4">
          {chunk.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              className="items-center w-1/4"
              onPress={() => router.push(item.route)} // Navigate to the specified route
            >
              <Icon name={item.icon} size={30} color="#ffffff" />
              <Text className="text-white text-xs mt-1 text-center">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <TouchableOpacity 
        className=' p-2  bg-primary-200 rounded-lg '
        onPress={() => router.push('DigitalMarketing')}  // You can add navigation functionality here
      >
        <Text  className=' text-white text-center justify-center'>View More</Text>
      </TouchableOpacity>
    </View>
  );
};


export default DigitalMarketingServicesList;
