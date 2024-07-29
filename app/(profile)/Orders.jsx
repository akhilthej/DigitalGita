import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useRouter } from 'expo-router';
import { useAuth } from "../../hooks/AuthContext";

const OrdersDigitalMarketing = () => {

  const router = useRouter(); // Get the router instance
  const { user } = useAuth();
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

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{user.email}</Text>

      <TouchableOpacity
        className=' p-2  bg-primary-200 rounded-lg '
        onPress={() => router.push('OrderDetails')}  // You can add navigation functionality here
      >
        <Text  className=' text-white text-center justify-center'>View More</Text>
      </TouchableOpacity>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderContainer}>
            <Text style={styles.userEmail}>{item.user_emailaddress}</Text>
            <Text>Total Reach: {item.total_reach}</Text>
            <Text>Total Leads: {item.total_leads}</Text>
            <Text>Impressions: {item.impressions}</Text>
            <Text>Clicks: {item.clicks}</Text>
            <Text>Budget Used: INR {item.budget_used}</Text>
            <Text>Mobile: {item.device_mobile}</Text>
            <Text>Desktop: {item.device_desktop}</Text>
            <Text>Age Groups: {item.age_groups}</Text>
            <Text>Male: {item.gender_male}</Text>
            <Text>Female: {item.gender_female}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  orderContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userEmail: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrdersDigitalMarketing;
