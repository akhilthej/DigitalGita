import { View, Text, TouchableOpacity } from "react-native";
import React, { Component } from 'react';

export class RecommendedPackages extends Component {
  render() {
    return (
      <View className="px-5">
        <Text className="text-black text-lg font-bold uppercase pt-3">
          Recommended Packages
        </Text>
        <Text className="text-black text-base">
          Choose your advertising objective and leave the rest to our expert clients.
        </Text>

        <TouchableOpacity className="p-4 bg-primary-100 rounded-lg mb-3">
          <Text className="text-white font-bold">Basic Boost Package</Text>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-white text-xs text-center">10</Text>
              <Text className="text-white text-xs text-center">Posters</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">0</Text>
              <Text className="text-white text-xs text-center">Videos</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">50k-1L</Text>
              <Text className="text-white text-xs text-center">Reach</Text>
            </View>
          </View>
          <Text className="text-white font-black mt-2">Price: 15,000 INR</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-4 bg-primary-200 rounded-lg mb-3">
          <Text className="text-white font-bold">Enhanced Visibility Package</Text>
          <View className="flex-row justify-between mb-2">
            <View>
              <Text className="text-white text-xs text-center">15</Text>
              <Text className="text-white text-xs text-center">Posters</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">1</Text>
              <Text className="text-white text-xs text-center">Videos</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">3L-5L</Text>
              <Text className="text-white text-xs text-center">Reach</Text>
            </View>
          </View>
          <Text className="text-white mt-2">Content Management</Text>
          <Text className="text-white font-black mt-2">Price: 25,000 INR</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-4 bg-primary-100 rounded-lg mb-3">
          <Text className="text-white font-bold">Comprehensive Growth Package</Text>
          <View className="flex-row justify-between mb-2">
            <View>
              <Text className="text-white text-xs text-center">25</Text>
              <Text className="text-white text-xs text-center">Posters</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">3</Text>
              <Text className="text-white text-xs text-center">Videos</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">3L-5L</Text>
              <Text className="text-white text-xs text-center">Reach</Text>
            </View>
          </View>
          <Text className="text-white mt-2">
            Content Management{"\n"}
            Google My Business Manager{"\n"}
            Local SEO
          </Text>
          <Text className="text-white font-black mt-2">Price: 35,000 INR</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-4 bg-primary-200 rounded-lg mb-3">
          <Text className="text-white font-bold">Premium Exposure Package</Text>
          <View className="flex-row justify-between mb-2">
            <View>
              <Text className="text-white text-xs text-center">30</Text>
              <Text className="text-white text-xs text-center">Posters</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">3</Text>
              <Text className="text-white text-xs text-center">Videos</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">10L-15L</Text>
              <Text className="text-white text-xs text-center">Reach</Text>
            </View>
          </View>
          <Text className="text-white mt-2">
            Content Management{"\n"}
            Google My Business Manager{"\n"}
            Local SEO
          </Text>
          <Text className="text-white font-black mt-2">Price: 40,000 INR</Text>
        </TouchableOpacity>

        <TouchableOpacity className="p-4 bg-primary-100 rounded-lg">
          <Text className="text-white font-bold">Ultimate Branding Package</Text>
          <View className="flex-row justify-between mb-2">
            <View>
              <Text className="text-white text-xs text-center">30</Text>
              <Text className="text-white text-xs text-center">Posters</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">3</Text>
              <Text className="text-white text-xs text-center">Videos</Text>
            </View>
            <View>
              <Text className="text-white text-xs text-center">15L-25L</Text>
              <Text className="text-white text-xs text-center">Reach</Text>
            </View>
          </View>
          <Text className="text-white mt-2">
            Content Management{"\n"}
            Google My Business Manager{"\n"}
            Local SEO
          </Text>
          <Text className="text-white font-black mt-2">Price: 50,000 INR</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RecommendedPackages;
