import { Stack } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

const DigitalMarketingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.push('Services')}>
            <Text style={{ color: '#000000', marginLeft: 15 }}>Back</Text>
          </TouchableOpacity>
        ),
      }}
    >
    
      <Stack.Screen name='OrderDetails' />
    </Stack>
  );
};

export default DigitalMarketingLayout;
