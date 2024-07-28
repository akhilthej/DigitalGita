import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native";
import WikiCoverImage from "../../assets/images/coverimages/WikiCoverImage.png";
import Header from "../../components/homecomponents/Header";
import { SERVICES } from "../../hooks/ApiHooks"; // Adjust the path if needed

const items = [
  { name: "Keywords Research", icon: "magnify", color: "#4285F4" },
  { name: "Ads Optimization", icon: "google-ads", color: "#EA4335" },
  { name: "Target Auditions", icon: "account-group", color: "#34A853" },
  { name: "Custom Ad Design", icon: "palette", color: "#FBBC05" },
];

const Grow = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SERVICES);
        const data = await response.json();

        if (data.status === "success") {
          setServices(data.data); // Adjust based on actual response structure
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Network error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center ">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center 0">
        <Text className="text-red-500 text-center mt-4">{error}</Text>
      </View>
    );
  }

  const renderStaticContent = () => (
    <View>
      <Image
        source={WikiCoverImage}
        className="w-full h-60"
        resizeMode="cover"
      />
      <View className="mx-2">
        <View className="p-2 mx-4">
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

        <View className="p-4 rounded-lg m-2">
          {items.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <View
                  key={index}
                  className="flex-row justify-between mb-4"
                >
                  <View className="flex-row items-center w-1/2">
                    <Icon
                      name={item.icon}
                      size={30}
                      color={item.color}
                      className="mr-2"
                    />
                    <Text className="text-black text-xs">
                      {item.name}
                    </Text>
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
          })}
        </View>
      </View>
    </View>
  );

  const renderServiceItem = ({ item }) => (
    <View className="bg-white p-4 rounded-lg mb-3 shadow-md">
      <Text className="text-lg font-bold mb-2">{item.service_name}</Text>
      <Text className="text-sm text-gray-600">
        Category: {item.service_category}
      </Text>
      <Text className="text-sm text-gray-600">
        Description: {item.service_description}
      </Text>
      <Text className="text-sm text-gray-600">
        Provider: {item.service_provider}
      </Text>
    </View>
  );

  return (
    <>
      <Header />
      <SafeAreaView className="flex-1 ">
        <FlatList
          ListHeaderComponent={renderStaticContent}
          data={services}
          keyExtractor={(item) => item.id.toString()} // Ensure you have an `id` field in your data
          renderItem={renderServiceItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </SafeAreaView>
    </>
  );
};

export default Grow;
