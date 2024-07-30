import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native";
import WikiCoverImage from "../../assets/images/coverimages/WikiCoverImage.png";
import Header from "../../components/homecomponents/Header";
import RecommendedPackages from "../(grow)/RecommendedPackages";

const items = [
  { name: "Keywords Research", icon: "magnify", color: "#4285F4" },
  { name: "Ads Optimization", icon: "google-ads", color: "#EA4335" },
  { name: "Target Auditions", icon: "account-group", color: "#34A853" },
  { name: "Custom Ad Design", icon: "palette", color: "#FBBC05" },
];

const Grow = () => {
  const renderItem = ({ item, index }) => {
    if (index % 2 === 0) {
      return (
        <View key={index} className="flex-row justify-between">
          <View className="flex-row items-center w-1/2">
            <Icon
              name={item.icon}
              size={30}
              color={item.color}
              className="mr-2"
            />
            <Text className="text-black text-xs">{item.name}</Text>
          </View>
          {items[index + 1] && (
            <View className="flex-row items-center w-1/2">
              <Icon
                name={items[index + 1].icon}
                size={30}
                color={items[index + 1].color}
                className="mr-2"
              />
              <Text className="text-black text-xs">
                {items[index + 1].name}
              </Text>
            </View>
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <>
      <Header />
      <SafeAreaView className="flex-1">
        <FlatList
          ListHeaderComponent={
            <>
              <Image
                source={WikiCoverImage}
                className="w-full h-60"
                resizeMode="cover"
              />
              <View className="mx-2">
                <Text className="text-blue-800 text-lg text-center font-black uppercase px-5">
                  Why do you need Digital Marketing?
                </Text>
                <Text className="bg-blue-400 rounded-md text-center text-white text-base font-bold px-5 py-2">
                  Affordable way to reach more customers
                </Text>
              </View>
              <View className="px-5">
                <Text className="text-black text-lg font-bold uppercase pt-3">
                  Choose your Package
                </Text>
                <Text className="text-black text-base">
                  Choose your advertising objective and rest leave it to our
                  expert clients.
                </Text>
              </View>
            </>
          }
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={<RecommendedPackages />}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </SafeAreaView>
    </>
  );
};

export default Grow;
