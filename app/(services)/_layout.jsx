import { Slot, Stack, SplashScreen } from 'expo-router';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';

const AuthLayout = ({ }) => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00',
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
    <Stack.Screen name='DigitalMarketing' options={{headerShown: true}}  />
      <Stack.Screen name='Events' options={{headerShown: true}}  />


      <Stack.Screen name='(DigitalMarketing)' options={{headerShown: false}}  />
      <Stack.Screen name='(Events)' options={{headerShown: false}}  />
    </Stack>
  );
};

export default AuthLayout;
