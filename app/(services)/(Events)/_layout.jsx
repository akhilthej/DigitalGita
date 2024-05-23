import { Slot, Stack, SplashScreen } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

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
            <Text style={{ color: '#fff', marginLeft: 15 }}>Back</Text>
          </TouchableOpacity>
        ),
      }}
    >
      
      <Stack.Screen name='Wedding' />
    </Stack>
  );
};

export default EventsLayout;
