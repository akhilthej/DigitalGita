import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import ServicesCoverimage from '../../assets/images/coverimages/ServicesCoverimage.png';
import Header from '../../components/homecomponents/Header.js'

import DigitalMarketingServicesList from "../../components/servicecomponents/DigitalMarketingServicesList.js"

const Services = () => {
  return (
    <>
      <Header />
      <View colors={['#f9faf8', '#dbe9db']} style={{ flex: 1 }}>
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
                
              </View>
            </View>
            
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Services;
