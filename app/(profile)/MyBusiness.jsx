import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../hooks/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { CRUD_MYBUSINESS } from "../../hooks/ApiHooks";

const MyBusiness = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [logo, setLogo] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState(null);

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
      const userBusinesses = data.filter(business => business.user_emailaddress === email);
      setBusinesses(userBusinesses);
    } catch (error) {
      console.error("Error fetching businesses: ", error);
      Alert.alert("Error", "Error fetching businesses");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0]);
    }
  };

  const handleSave = async () => {
    if (!businessName) {
      Alert.alert("Error", "Business name is required");
      return;
    }

    const formData = new FormData();
    formData.append("user_emailaddress", email);
    formData.append("business_name", businessName);
    formData.append("Target_Location", location);
    formData.append("Target_Keywords", keywords);

    if (logo) {
      formData.append("business_logo", {
        uri: logo.uri,
        type: "image/jpeg",
        name: logo.fileName || "businessLogo.jpg",
      });
    }

    try {
      const response = await fetch(CRUD_MYBUSINESS, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} - ${result.error}`
        );
      }

      Alert.alert("Success", "Business added successfully");
      fetchBusinesses(); // Refresh the list
      // Clear form after success
      setBusinessName("");
      setLocation("");
      setKeywords("");
      setLogo(null);
    } catch (error) {
      console.error("Error: ", error);
      Alert.alert("Error", `Failed to add business: ${error.message}`);
    }
  };

  const handleEdit = async () => {
    if (!businessName || !currentBusinessId) {
      Alert.alert("Error", "ID and Business Name are required");
      return;
    }

    const formData = {
      id: currentBusinessId,
      user_emailaddress: email,
      business_name: businessName,
      Target_Location: location,
      Target_Keywords: keywords,
    };

    try {
      const response = await fetch(CRUD_MYBUSINESS, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} - ${result.error}`
        );
      }

      Alert.alert("Success", "Business updated successfully");
      fetchBusinesses(); // Refresh the list
      // Clear form after success
      setBusinessName("");
      setLocation("");
      setKeywords("");
      setLogo(null);
      setEditMode(false);
      setCurrentBusinessId(null);
    } catch (error) {
      console.error("Error: ", error);
      Alert.alert("Error", `Failed to update business: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${CRUD_MYBUSINESS}?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} - ${result.error}`
        );
      }

      Alert.alert("Success", "Business deleted successfully");
      fetchBusinesses(); // Refresh the list
    } catch (error) {
      console.error("Error: ", error);
      Alert.alert("Error", `Failed to delete business: ${error.message}`);
    }
  };

  const renderItem = ({ item }) => {
    const imageUri = item.business_logo; // This now contains the base64 data URI

    return (
      <View style={styles.item}>
        <Text>Business Name: {item.business_name}</Text>
        <Text>Location: {item.Target_Location}</Text>
        <Text>Keywords: {item.Target_Keywords}</Text>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setEditMode(true);
            setCurrentBusinessId(item.id);
            setBusinessName(item.business_name);
            setLocation(item.Target_Location);
            setKeywords(item.Target_Keywords);
          }}
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderTwoItemsPerRow = ({ item, index }) => {
    if (index % 2 === 0) {
      return (
        <View style={styles.row}>
          {renderItem({ item })}
          {businesses[index + 1] && renderItem({ item: businesses[index + 1] })}
        </View>
      );
    }
    return null; // Don't render the item directly if it's an odd index
  };

  return (
    <View style={styles.container}>
      {editMode ? (
        <Text style={styles.title}>Edit Business</Text>
      ) : (
        <Text style={styles.title}>Add Business</Text>
      )}
      <TextInput
        style={styles.input}
        value={businessName}
        onChangeText={setBusinessName}
        placeholder="Business Name"
      />
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />
      <TextInput
        style={styles.input}
        value={keywords}
        onChangeText={setKeywords}
        placeholder="Keywords"
      />
      <Button title="Pick a logo" onPress={pickImage} />
      {logo && (
        <Image source={{ uri: logo.uri }} style={{ width: 200, height: 200 }} />
      )}
      {editMode ? (
        <Button title="Update" onPress={handleEdit} />
      ) : (
        <Button title="Save" onPress={handleSave} />
      )}

      <FlatList
        data={businesses}
        renderItem={renderTwoItemsPerRow}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "blue",
    padding: 5,
    marginTop: 10,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    marginTop: 10,
  },

  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  list: {
    marginTop: 20,
  },
});

export default MyBusiness;
