import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const DigitalMarketingPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(
        "https://digitalgita.cyberspacedigital.in/api/digitalmarketing_packages/DigitalMarketingPackages.php"
      );
      setPackages(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-xl">Error: {error}</Text>
      </View>
    );
  }

  const renderIcons = (providers) => {
    const providerList = providers.split(".").map((p) => p.trim()); // Split and trim provider names

    return providerList.map((provider, index) => {
      let icon;
      switch (provider) {
        case "Facebook":
          icon = <FontAwesome name="facebook" size={24} color="#3b5998" />;
          break;
        case "Instagram":
          icon = <FontAwesome name="instagram" size={24} color="#e4405f" />;
          break;
        case "Google":
          icon = <FontAwesome name="google" size={24} color="#db4437" />;
          break;
        case "Youtube":
          icon = <FontAwesome name="youtube" size={24} color="#ff0000" />;
          break;
        default:
          return null;
      }
      return (
        <React.Fragment key={index}>
          {index > 0 && <Text className="mx-2 text-gray-500">.</Text>}
          {icon}
        </React.Fragment>
      );
    });
  };

  return (
    <View className="flex-1">

<View className='px-4'>
     <Text className="text-black text-lg font-bold uppercase pt-4">
          Recommended Packages
        </Text>
        <Text className="text-black">
          Choose your advertising objective and leave the rest to our expert clients.
        </Text>
        </View>

      <FlatList
        data={packages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity className="p-4 border-b border-gray-300 flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-[16px] font-bold">{item.package_name}</Text>
              <Text className="text-[12px]">Description</Text>
              <Text className="text-[14px] font-bold">
                {item.package_description}
              </Text>
            </View>
            <View className="flex-row items-center">
              {renderIcons(item.package_provider)}
              <FontAwesome
                name="chevron-right"
                size={12}
                color="#000"
                className="ml-4"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DigitalMarketingPackages;
