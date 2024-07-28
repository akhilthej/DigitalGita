import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';


const items = [
  { name: 'FB Meta', icon: 'facebook', route: 'GoogleAds' },
  { name: 'Google Ads', icon: 'google-ads', route: 'Wedding' },
  { name: 'YouTube', icon: 'youtube', route: 'GoogleAds' },
  { name: 'Google My Business', icon: 'google-my-business', route: 'GoogleAds' },

  { name: 'SEO', icon: 'magnify', route: 'CreditScore' },
  { name: 'Social Media Management', icon: 'account-group', route: 'BikeLoan' },
  { name: 'Ecommerce Marketing', icon: 'shopping', route: 'MutualFundLoan' },
  { name: 'Influencer Marketing', icon: 'account-star', route: 'HomeLoan' },

  { name: 'Content Marketing', icon: 'file-document', route: 'CreditScore' },
  { name: 'WhatsApp Marketing', icon: 'whatsapp', route: 'BikeLoan' },
  { name: 'Affiliate Marketing', icon: 'account-multiple', route: 'MutualFundLoan' },
  { name: 'Video Marketing', icon: 'video', route: 'HomeLoan' },
];


// Helper function to split items into chunks of 4
const chunkItems = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const DigitalMarketing = () => {
  const router = useRouter(); // Get the router instance
  const chunkedItems = chunkItems(items, 4);

  return (
    <SafeAreaView>
    <ScrollView>

    <View className="bg-primary-100 p-4 rounded-lg m-2">
    


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
      
    </View>


    </ScrollView>
    </SafeAreaView>
  );
};


export default DigitalMarketing;
