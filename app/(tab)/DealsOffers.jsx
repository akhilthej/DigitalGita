import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import DealsOffersCoverimage from '../../assets/images/coverimages/DealsOffersCoverimage.png';
import Header from '../../components/homecomponents/Header';

const DealsOffers = () => {
  return (
    <>
      <Header />
      <View style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <ScrollView>
            
            <View className="flex-1">
              <Image 
                source={DealsOffersCoverimage}
                className="w-full h-60"
                resizeMode="cover"
              />
              <View className="p-4">
                <Text className="text-2xl font-bold">Services</Text>
                <Text className="text-lg mt-2">Here is the list of services we offer...</Text>
              </View>
            </View>
            
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default DealsOffers;
