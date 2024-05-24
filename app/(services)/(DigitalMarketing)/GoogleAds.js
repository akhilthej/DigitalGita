import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { images } from '../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

import { router } from 'expo-router';

const GoogleAds = () => {
  return (
    <View>
      <ScrollView>
        <Image
          source={images.GoogleAdsCoverImage}
          className="w-full h-60"
          resizeMode="cover"
        />

        <Text className="text-lg font-bold text-center mt-2">
          Building your Brand on Google with
        </Text>
        <Text className="text-2xl font-bold text-center">
          GoogleAds
        </Text>
        <Text className="text-sm text-gray-800 text-center mt-2">
          Does Google Ads offer?
        </Text>
        <Text className="text-sm text-gray-800 text-center mt-2">
          Google Ads offers various advertising options for businesses to promote their products or services across Google's network, which includes Google Search, YouTube, Google Display Network, and other partner websites and apps. Some of the main advertising formats and options available through Google Ads include:
        </Text>
        <Text className="text-sm text-gray-800 text-center mt-2">
          • Search Ads: These are text ads that appear above or below the organic search results when people search for specific keywords on Google. Advertisers bid on keywords, and their ads are displayed to users who search for those terms.
        </Text>
        {/* Add more Text components for other points */}
        
        <View className='flex flex-row'>
  <TouchableOpacity onPress={() => router.push('signup')} className='flex-row drop-shadow-2xl max-w-[200px] mx-auto items-center bg-primary rounded-2xl mt-5'>
  <Text className='text-[13px] text-center font-bold text-white p-5'>
    Order now
  </Text>
  <Icon
    name="cart-outline" // Example of a different icon, change it to the desired icon name
    size={30}
    color='white'
    style={{ marginLeft: 'auto', marginRight: 20 }}
  />
</TouchableOpacity>

<TouchableOpacity onPress={() => router.push('signup')} className='flex-row drop-shadow-2xl max-w-[200px] mx-auto items-center bg-primary rounded-2xl mt-5'>
  <Text className='text-[13px] text-center font-bold text-white p-5'>
    Get Help
  </Text>
  <Icon
    name="help-circle-outline"
    size={30}
    color='white'
    style={{ marginLeft: 'auto', marginRight: 20 }}
  />
</TouchableOpacity>
</View>

<Text className="text-xs font-light text-gray-700 mt-2 text-center pb-10 bottom-0">
          www.digitalgita.com{"\n"}
          &copy; 2024 Cyber Space Digital. All rights reserved.
        </Text>

      </ScrollView>
    </View>
  );
};

export default GoogleAds;
