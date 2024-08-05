import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Calendar } from "react-native-calendars";

const OrderDetails = () => {
  const { orderid, email } = useLocalSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    if (orderid && email) {
      fetchOrderDetails();
    } else {
      setError("Missing parameters");
      setLoading(false);
    }
  }, [orderid, email]);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `https://digitalgita.cyberspacedigital.in/api/orders/digitalmarketing_orders_fetch.php?orderid=${orderid}&email=${email}`
      );
      const data = response.data[0]; // Assuming the response is an array

      setOrder(data);

      // Prepare marked dates
      if (data.date) {
        const datesArray = data.date.split(","); // Split the comma-separated string
        const marked = datesArray.reduce((acc, date) => {
          acc[date] = {
            selected: true,
            selectedColor: "blue", // Highlight color
            selectedTextColor: "white", // Text color on the highlighted date
          };
          return acc;
        }, {});
        setMarkedDates(marked);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-xl">Error: {error}</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-xl">No order details available</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4">
      <View className="mb-4 flex-row">
        {/* Column container for Order ID */}
        <View className="flex-1 pr-2">
          <Text className="font-bold text-lg">Order ID:</Text>
          <Text className="mb-2">{order.orderid}</Text>
        </View>
        {/* Column container for Package Name */}
        <View className="flex-1 pl-2">
          <Text className="font-bold text-lg">Package Name:</Text>
          <Text className="mb-2">{order.package_name}</Text>
        </View>
      </View>

      <View className="flex-row">
        {/* Column container for Order ID */}
        <View className="flex-1">
          <Text className="font-bold text-sm">Impressions</Text>
          <Text className="mb-2">{order.impressions}</Text>
        </View>
        <View className="flex-1">
          <Text className="font-bold text-sm">Total Reach</Text>
          <Text className="mb-2">{order.total_reach}</Text>
        </View>
        {/* Column container for Package Name */}
        <View className="flex-1">
          <Text className="font-bold text-sm">Total Leads</Text>
          <Text className="mb-2">{order.total_leads}</Text>
        </View>
        <View className="flex-1">
          <Text className="font-bold text-sm">Clicks</Text>
          <Text className="mb-2">{order.clicks}</Text>
        </View>
      </View>

      <View className="mb-4">
        <Text className="font-bold text-md">Budget Spend</Text>
        <Text className="mb-2">₹ {order.budget_used}</Text>
      </View>

      <View className="mx-auto p-2">
        <Text className="font-bold text-md">Posted On</Text>
      </View>

      <Calendar markedDates={markedDates} />

      <View className="mb-4 flex-row">
        {/* Column container for Order ID */}
        <View className="flex-1 pr-2">
          <Text className="font-bold text-lg">Mobile</Text>
          <Text className="mb-2">{order.device_mobile}</Text>
        </View>
        {/* Column container for Package Name */}
        <View className="flex-1 pl-2">
          <Text className="font-bold text-lg">Desktop</Text>
          <Text className="mb-2">{order.device_desktop}</Text>
        </View>
      </View>

      <Text className="font-bold text-lg">Age Groups:</Text>
      <Text className="mb-2">{order.age_groups}</Text>

      <View className="mb-4 flex-row">
        {/* Column container for Order ID */}
        <View className="flex-1 pr-2">
          <Text className="font-bold text-lg">Male</Text>
          <Text className="mb-2">{order.gender_male}</Text>
        </View>
        {/* Column container for Package Name */}
        <View className="flex-1 pl-2">
          <Text className="font-bold text-lg">Female</Text>
          <Text className="mb-2">{order.gender_female}</Text>
        </View>
      </View>

      <Text className="font-bold text-lg">Created on:</Text>
      <Text className="mb-2">{order.created_at}</Text>

      <Text className="font-bold text-lg">Target Location</Text>
      <Text className="mb-10">{order.Target_location}</Text>
    </ScrollView>
  );
};

export default OrderDetails;
