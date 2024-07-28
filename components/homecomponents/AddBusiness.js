import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "../../hooks/AuthContext";
import * as ImagePicker from "expo-image-picker";

const AddBusiness = ({ onClose }) => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [logo, setLogo] = useState(null);

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
    const formData = new FormData();
    formData.append("user_emailaddress", email);
    formData.append("business_name", businessName);
    formData.append("Target_Location", location);
    formData.append("Target_Keywords", keywords);

    if (logo) {
      formData.append("logo", {
        uri: logo.uri,
        type: logo.type,
        name: logo.fileName || "logo.png",
      });
    }

    try {
      const response = await fetch(
        "https://digitalgita.cyberspacedigital.in/api/add_business.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.id) {
        Alert.alert("Success", "Business added successfully");
        onClose(result);
      } else {
        Alert.alert("Error", result.error || "Failed to add business");
      }
    } catch (error) {
      Alert.alert("Error", `Failed to add business: ${error.message}`);
    }
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
      <Button title="Save" onPress={handleSave} />
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
});

export default AddBusiness;
