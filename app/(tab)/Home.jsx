import React from 'react';
import { StatusBar, SafeAreaView, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ImageSlider from '../../components/ImageSlider';
import Header from '../../components/homecomponents/Header';
import ServicesList from '../../components/homecomponents/ServicesList';

export default function App() {
  return (
    <LinearGradient colors={['#f9faf8', '#dbe9db']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden/>
        <Header />
        <ScrollView>
          <View>
            <ImageSlider />
            <ServicesList />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
