import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const OrderDetails = () => {
  const { orderid, email } = useLocalSearchParams(); // Get both orderid and email
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Order ID:', orderid); // Log the orderid
    console.log('Email:', email); // Log the email

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
      console.log('API Response:', response.data);
      setOrder(response.data[0]); // Assuming the response is an array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No order details available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Order ID:</Text>
      <Text style={styles.value}>{order.orderid}</Text>
      <Text style={styles.label}>Total Reach:</Text>
      <Text style={styles.value}>{order.total_reach}</Text>
      <Text style={styles.label}>Total Leads:</Text>
      <Text style={styles.value}>{order.total_leads}</Text>
      <Text style={styles.label}>Impressions:</Text>
      <Text style={styles.value}>{order.impressions}</Text>
      <Text style={styles.label}>Clicks:</Text>
      <Text style={styles.value}>{order.clicks}</Text>
      <Text style={styles.label}>Budget Used:</Text>
      <Text style={styles.value}>INR {order.budget_used}</Text>
      <Text style={styles.label}>Mobile:</Text>
      <Text style={styles.value}>{order.device_mobile}</Text>
      <Text style={styles.label}>Desktop:</Text>
      <Text style={styles.value}>{order.device_desktop}</Text>
      <Text style={styles.label}>Age Groups:</Text>
      <Text style={styles.value}>{order.age_groups}</Text>
      <Text style={styles.label}>Male:</Text>
      <Text style={styles.value}>{order.gender_male}</Text>
      <Text style={styles.label}>Female:</Text>
      <Text style={styles.value}>{order.gender_female}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default OrderDetails;
