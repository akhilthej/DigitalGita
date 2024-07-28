import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import WikiCoverImage from '../../assets/images/coverimages/WikiCoverImage.png';
import Header from '../../components/homecomponents/Header';


const Grow = () => {
  return (
    <>
      <Header />
      <View style={{ flex: 1 }}>
        <SafeAreaView className="flex-1">
          <ScrollView>
            <View className="flex-1">
              <Image 
                source={WikiCoverImage}
                className="w-full h-60"
                resizeMode="cover"
              />
            </View>
            
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Grow;
