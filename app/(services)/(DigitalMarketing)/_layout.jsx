import { Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

const DigitalMarketingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FF5B00',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push('Services')}>
            <Text style={{ color: '#fff', marginLeft: 15 }}>Back</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name='GoogleAds' />
    </Stack>
  );
};

export default DigitalMarketingLayout;
