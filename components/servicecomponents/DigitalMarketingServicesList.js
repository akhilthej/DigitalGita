import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styled } from 'nativewind';
import { useRouter } from 'expo-router';

const items = [
  { name: 'FB Meta', icon: 'facebook', route: 'GoogleAds' },
  { name: 'Google Ads', icon: 'google-ads', route: 'GoogleAds' },
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

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

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
    <StyledView className="bg-teal-800 p-4 rounded-lg m-2">
      <StyledText className="text-white text-md mb-4">Digital Marketing</StyledText>
      {chunkedItems.map((chunk, chunkIndex) => (
        <StyledView key={chunkIndex} className="flex-row justify-between mb-4">
          {chunk.map((item, index) => (
            <StyledTouchableOpacity 
              key={index} 
              className="items-center w-1/4"
              onPress={() => router.push(item.route)} // Navigate to the specified route
            >
              <Icon name={item.icon} size={30} color="#ffffff" />
              <StyledText className="text-white text-sm mt-1 text-center">{item.name}</StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      ))}
    </StyledView>
  );
};

export default DigitalMarketingServicesList;
