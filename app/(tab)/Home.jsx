import React from 'react';
import { StatusBar, SafeAreaView, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ImageSlider from '../../components/ImageSlider';
import Header from '../../components/homecomponents/Header';
import ServicesList from '../../components/homecomponents/ServicesList';


export default function App() {
  return (
    <>
   <Header />
    <LinearGradient colors={['#f9faf8', '#dbe9db']} style={{ flex: 1 }}>
   
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <View>
            <ImageSlider />
            <ServicesList />
            <ServicesList />
          </View>
        </ScrollView>
        
      </SafeAreaView>
      
    </LinearGradient>
    </>
  );
}
