import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import ImageSlider from "../../components/ImageSlider";
import Header from "../../components/homecomponents/Header";

import DigitalMarketingServicesList from "../../components/servicecomponents/DigitalMarketingServicesList";
import BusinessBar from "../../components/homecomponents/BusinessBar";

export default function App() {
  return (
    <>
      <Header />

      <View className="flex-1">
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View>
              <ImageSlider />
              <DigitalMarketingServicesList />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}
