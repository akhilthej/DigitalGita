import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/AuthContext";
import { CRUD_MYBUSINESS } from "../../hooks/ApiHooks";
import Icon from "react-native-vector-icons/FontAwesome"; // Assuming you are using FontAwesome for the arrow icon

const BusinessBar = () => {
  const { user } = useAuth();
  const [email] = useState(user.email);
  const [businesses, setBusinesses] = useState([]);
  const [showBusinesses, setShowBusinesses] = useState(false); // State to control visibility

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch(CRUD_MYBUSINESS);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const userBusinesses = data.filter(
        (business) => business.user_emailaddress === email
      );
      setBusinesses(userBusinesses);
    } catch (error) {
      console.error("Error fetching businesses: ", error);
      Alert.alert("Error", "Error fetching businesses");
    }
  };

  const renderBusiness = ({ item }) => (
    <View className=" items-center p-2 mx-2">
      {item.business_logo && (
        <Image source={{ uri: item.business_logo }} className="w-12 h-12 mb-1" />
      )}
      <Text className="text-[10px] font-bold text-center">{item.business_name}</Text>
    </View>
  );

  return (
    <View className=" bg-white">
      <TouchableOpacity
        className="flex-row items-center justify-center p-2"
        onPress={() => setShowBusinesses(!showBusinesses)}
      >
        <Text className=" text-sm font-bold uppercase">My Businesses</Text>
        <Icon
          name={showBusinesses ? "angle-up" : "angle-down"}
          size={20}
          className="ml-2"
        />
      </TouchableOpacity>
      {showBusinesses && (
        <FlatList
          data={businesses}
          renderItem={renderBusiness}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default BusinessBar;
