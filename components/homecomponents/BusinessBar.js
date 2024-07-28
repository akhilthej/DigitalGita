import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  FlatList,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddBusiness from "./AddBusiness"; // Adjust the path if needed

const BusinessBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [isAddBusinessVisible, setIsAddBusinessVisible] = useState(false);
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    // Fetch businesses when the component mounts
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch(
        "https://digitalgita.cyberspacedigital.in/api/add_business.php"
      );
      const result = await response.json();
      setBusinesses(result);
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    }
  };

  const toggleVisibility = () => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    } else {
      setIsVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleAddBusiness = () => {
    setIsAddBusinessVisible(true);
  };

  const closeAddBusiness = (newBusiness) => {
    setIsAddBusinessVisible(false);
    if (newBusiness) {
      setBusinesses((prevBusinesses) => [...prevBusinesses, newBusiness]);
    }
  };

  const animatedStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [60, 0], // Adjust the outputRange values as needed
        }),
      },
    ],
  };

  const renderBusiness = ({ item }) => (
    <View style={styles.box}>
      <Text>{item.business_name}</Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity
        style={styles.arrowContainer}
        onPress={toggleVisibility}
      >
        <Ionicons
          name={isVisible ? "chevron-down" : "chevron-up"}
          size={30}
          color="gray"
        />
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          !isVisible && { display: "none" },
        ]}
      >
        {businesses.length === 0 ? (
          Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={handleAddBusiness}
            >
              <Ionicons name="add-circle" size={40} color="gray" />
            </TouchableOpacity>
          ))
        ) : (
          <FlatList
            data={businesses}
            renderItem={renderBusiness}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // Display items in two columns
          />
        )}
      </Animated.View>
      {isAddBusinessVisible && (
        <View style={styles.addBusinessContainer}>
          <AddBusiness onClose={closeAddBusiness} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  arrowContainer: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -15 }],
    zIndex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  box: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    height: 100, // Set a fixed height to maintain the box layout
    alignItems: "flex-start", // Align text to the start
    textAlign: "center", // Center align text
  },
  addBusinessContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BusinessBar;
