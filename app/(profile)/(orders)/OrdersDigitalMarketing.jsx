import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import { Link } from "expo-router";
import { useAuth } from "../../../hooks/AuthContext";

const OrdersDigitalMarketing = () => {
  const { user } = useAuth(); // Ensure user.email is available
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://digitalgita.cyberspacedigital.in/api/orders/digitalmarketing_orders_fetch.php?email=${user.email}`
      );
      setOrders(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClassName = (status) => {
    switch (status) {
      case "Processing":
        return "bg-blue-500 text-white";
      case "Approved":
        return "bg-green-700 text-white";
      case "Disapproved":
      case "Restricted":
        return "bg-red-500 text-white";
      case "Completed":
        return "bg-black text-white";
      default:
        return "bg-gray-300 text-black";
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
        <Text className="text-red-500 text-lg">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5">
      <Text className="text-lg font-bold">{user.email}</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) =>
          item.orderid ? item.orderid.toString() : "no-id"
        }
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center p-4 border-b border-gray-300 mb-2">
            <View className="flex-1">
              <Text className="text-[14px] ">Order ID:</Text>
              <Text className="text-[14px] font-black">{item.orderid}</Text>

              <View className="flex-row p-2 mt-2 space-x-4">
                <Text className="text-[12px] text-center">
                  Total Reach{"\n"}
                  {item.total_reach}
                </Text>
                <Text className="text-[12px] text-center">
                  Total Impressions{"\n"}
                  {item.impressions}
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-[10px] font-black text-center">STATUS</Text>
              <View
                className={`py-1 px-2 rounded ${getStatusClassName(
                  item.status
                )}`}
              >
                <Text className="text-sm text-white font-bold text-center">
                  {item.status}
                </Text>
              </View>

              <Link
                href={{
                  pathname: "/OrderDetails",
                  params: { orderid: item.orderid, email: user.email },
                }}
                className=" py-2 px-4 rounded mt-2"
              >
                <Text className="text-blue-500 font-black text-center">
                  View More
                </Text>
              </Link>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrdersDigitalMarketing;
