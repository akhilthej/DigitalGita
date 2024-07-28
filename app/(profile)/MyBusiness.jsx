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
      setBusinesses(data);
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
    if (!email || !businessName) {
      Alert.alert("Error", "User email and business name are required");
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
      setEmail(user.email);
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
    if (!email || !businessName || !currentBusinessId) {
      Alert.alert("Error", "ID, Email, and Business Name are required");
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
      setEmail(user.email);
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

  const handleEditInitiate = (item) => {
    setEditMode(true);
    setCurrentBusinessId(item.id);
    setEmail(item.user_emailaddress);
    setBusinessName(item.business_name);
    setLocation(item.Target_Location);
    setKeywords(item.Target_Keywords);
    setLogo(null); // Assuming logo won't be changed on edit
  };

  const renderItem = ({ item }) => {
    const imageUri = item.business_logo;

    return (
      <View style={styles.item}>
        <Text>Email: {item.user_emailaddress}</Text>
        <Text>Business Name: {item.business_name}</Text>
        <Text>Location: {item.Target_Location}</Text>
        <Text>Keywords: {item.Target_Keywords}</Text>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditInitiate(item)}
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email Address"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Business Name</Text>
      <TextInput
        style={styles.input}
        value={businessName}
        onChangeText={setBusinessName}
        placeholder="Business Name"
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />
      <Text style={styles.label}>Keywords</Text>
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
      <Button
        title={editMode ? "Update" : "Save"}
        onPress={editMode ? handleEdit : handleSave}
      />

      <FlatList
        data={businesses}
        renderItem={renderItem}
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
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
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
