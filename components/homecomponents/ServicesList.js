import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styled } from 'nativewind';

const items = [
  { name: 'FB Meta', icon: 'facebook', route: 'CreditScore' },
  { name: 'Google 365', icon: 'google', route: 'BikeLoan' },
  { name: 'YouTube', icon: 'youtube', route: 'MutualFundLoan' },
  { name: 'Outdoor', icon: 'nature', route: 'HomeLoan' },

  { name: 'PlayStore', icon: 'google-play', route: 'CreditScore' },
  { name: 'TV Ads', icon: 'television', route: 'BikeLoan' },
  { name: 'In-Game Ads', icon: 'gamepad-variant', route: 'MutualFundLoan' },
  { name: 'Theatre Ads', icon: 'movie', route: 'HomeLoan' },
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

const IconList = () => {
  const chunkedItems = chunkItems(items, 4);

  return (
    <StyledView className="bg-teal-800 p-4 rounded-lg m-2">
      <StyledText className="text-white text-md mb-4">Advertising</StyledText>
      {chunkedItems.map((chunk, chunkIndex) => (
        <StyledView key={chunkIndex} className="flex-row justify-between mb-4">
          {chunk.map((item, index) => (
            <StyledTouchableOpacity key={index} className="items-center w-1/4">
              <Icon name={item.icon} size={30} color="#ffffff" />
              <StyledText className="text-white text-sm mt-1 text-center">{item.name}</StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      ))}
    </StyledView>
  );
};

export default IconList;
