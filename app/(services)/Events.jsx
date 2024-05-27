import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const items = [
  { name: 'Wedding', icon: 'lamp', route: 'Wedding' },
  { name: 'Birthday', icon: 'balloon', route: 'Wedding' },
  { name: 'Exhibition', icon: 'ticket', route: 'Wedding' },
  { name: 'Corporate', icon: 'briefcase', route: 'Wedding' },

  { name: 'Religious', icon: 'church', route: 'Wedding' },
  { name: 'Sports', icon: 'football', route: 'Wedding' },
  { name: 'Entertainment', icon: 'ticket', route: 'Wedding' },
  { name: 'Political', icon: 'flag', route: 'Wedding' },
  
];

// Helper function to split items into chunks of 4
const chunkItems = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const Events = () => {
  const router = useRouter(); // Get the router instance
  const chunkedItems = chunkItems(items, 4);

  return (
    <SafeAreaView>
    <ScrollView>

    <View className="bg-teal-800 p-4 rounded-lg m-2">
      <Text className="text-white text-md mb-4">Events</Text>
      {chunkedItems.map((chunk, chunkIndex) => (
        <View key={chunkIndex} className="flex-row justify-between mb-4">
          {chunk.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              className="items-center w-1/4"
              onPress={() => router.push(item.route)} // Navigate to the specified route
            >
              <Icon name={item.icon} size={30} color="#ffffff" />
              <Text className="text-white text-sm mt-1 text-center">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>


    </ScrollView>
    </SafeAreaView>
  );
};


export default Events;
