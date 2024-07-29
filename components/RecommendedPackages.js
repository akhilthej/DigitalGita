import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const RecommendedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('https://digitalgita.cyberspacedigital.in/api/Recommended_packages.php');
      setPackages(response.data);
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
      <FlatList
        data={packages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.packageContainer}>
            <Text style={styles.serviceCategory}>{item.service_category}</Text>
            <Text style={styles.serviceName}>{item.service_name}</Text>
            <Text style={styles.serviceDescription}>{item.service_description}</Text>
            <Text style={styles.serviceProvider}>{item.service_provider}</Text>
            <Text style={styles.servicePrice}>INR {item.service_price}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  packageContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  serviceCategory: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceName: {
    fontSize: 16,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
  },
  serviceProvider: {
    fontSize: 14,
    color: '#555',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default RecommendedPackages;
