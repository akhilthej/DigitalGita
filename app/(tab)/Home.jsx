import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import ImageSlider from "../../components/ImageSlider";
import Header from "../../components/homecomponents/Header";



export default function App() {
  return (
    <>
      <Header />

      <View className="flex-1">
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View>

              <ImageSlider />
              <Text>Home</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}
