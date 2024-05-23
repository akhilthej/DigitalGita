import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import ServicesCoverimage from '../../assets/images/coverimages/ServicesCoverimage.png';
import Header from '../../components/homecomponents/Header.js';
import { LinearGradient } from 'expo-linear-gradient';

import DigitalMarketingServicesList from "../../components/servicecomponents/DigitalMarketingServicesList.js"
import EventsServicesList from '../../components/servicecomponents/EventsServicesList.js'

const Services = () => {
  return (
    <>
      <Header />
      <LinearGradient colors={['#f9faf8', '#dbe9db']} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <ScrollView>
            
            <View className="flex-1">
              <Image 
                source={ServicesCoverimage}
                className="w-full h-40"
                resizeMode="cover"
              />

              <View>
                <DigitalMarketingServicesList/>
                <EventsServicesList/>
              </View>
            </View>
            
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Services;
