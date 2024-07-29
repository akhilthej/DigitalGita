import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
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

      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderid ? item.orderid.toString() : 'no-id'}
        renderItem={({ item }) => (
          <View style={styles.orderContainer}>
            <Text>Order ID: {item.orderid}</Text>
            <Text style={styles.userEmail}>Total Reach: {item.total_reach}</Text>
            <Link
              href={{
                pathname: '/OrderDetails',
                params: { orderid: item.orderid, email: user.email }
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>View More</Text>
            </Link>
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
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default OrdersDigitalMarketing;
