import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';

const items = [
  { name: 'Wedding', icon: 'balloon', route: 'Wedding' },
  { name: 'Birthday', icon: 'cake', route: 'Wedding' },
  { name: 'Exhibition', icon: 'ticket', route: 'Wedding' },
  { name: 'Corporate', icon: 'briefcase', route: 'Wedding' },

];

// Helper function to split items into chunks of 4
const chunkItems = (items, size) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

const EventsServicesList = () => {
  const router = useRouter(); // Get the router instance
  const chunkedItems = chunkItems(items, 4);

  return (
    <View className="bg-teal-800 p-4 rounded-lg m-2">
     <TouchableOpacity 
        className='top-1 absolute right-1 p-2  bg-teal-900 rounded-lg'
        onPress={() => router.push('Events')}  // You can add navigation functionality here
      >
        <Text  className=' text-white'>View More</Text>
      </TouchableOpacity>

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
  );
};


export default EventsServicesList;
