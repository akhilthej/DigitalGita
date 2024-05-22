import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import WikiCoverImage from '../../assets/images/coverimages/WikiCoverImage.png';
import Header from '../../components/homecomponents/Header';
import { LinearGradient } from 'expo-linear-gradient';

import ServicesList from '../../components/wikicomponets/ServicesList'

const Wiki = () => {
  return (
    <>
      <Header />
      <LinearGradient colors={['#f9faf8', '#dbe9db']} style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <ScrollView>
            <View className="flex-1">
              <Image 
                source={WikiCoverImage}
                className="w-full h-60"
                resizeMode="cover"
              />
            </View>
            <ServicesList />
            
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Wiki;
