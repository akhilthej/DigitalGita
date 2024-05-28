import { Slot, Stack, SplashScreen } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

import Icon from 'react-native-vector-icons/Ionicons';

const EventsLayout = ({ }) => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity  onPress={() => router.push('Services')}>
           <Icon
    name="arrow-back"
    size={30}
    color='white'
    style={{ marginLeft: 'auto' }}
  />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => router.push('Help')} >
  <Icon
    name="help-circle-outline"
    size={30}
    color='white'
    style={{ marginLeft: 'auto' }}
  />
</TouchableOpacity>
        ),
      }}
    >
      
      <Stack.Screen name='Wedding' />
    </Stack>
  );
};

export default EventsLayout;
