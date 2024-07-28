import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useAuth } from "../../hooks/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { CRUD_MYBUSINESS } from "../../hooks/ApiHooks";
import Icon from "react-native-vector-icons/FontAwesome";

const MyBusiness = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user.email);
  const [businessName, setBusinessName] = useState("");
  const [location, setLocation] = useState("");
  const [keywords, setKeywords] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState(null);
  const [showForm, setShowForm] = useState(false); // New state variable

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
      const userBusinesses = data.filter(
        (business) => business.user_emailaddress === email
      );
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
    formData.append("facebook_url", facebookUrl);
    formData.append("instagram_url", instagramUrl);
    formData.append("youtube_url", youtubeUrl);
    formData.append("linkedin_url", linkedinUrl);

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
      setFacebookUrl("");
      setInstagramUrl("");
      setYoutubeUrl("");
      setLinkedinUrl("");
      setLogo(null);
      setShowForm(false); // Hide form after saving
    } catch (error) {
      console.error("Error: ", error);
      Alert.alert("Error", `Failed to add business: ${error.message}`);
    }
  };

  const handleUpdate = async (id) => {
    if (!businessName) {
      Alert.alert("Error", "Business name is required");
      return;
    }

    const updatedBusiness = {
      id: id,
      user_emailaddress: email,
      business_name: businessName,
      Target_Location: location,
      Target_Keywords: keywords,
      facebook_url: facebookUrl,
      instagram_url: instagramUrl,
      youtube_url: youtubeUrl,
      linkedin_url: linkedinUrl,
    };

    try {
      const response = await fetch(CRUD_MYBUSINESS, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBusiness),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Alert.alert("Success", "Business updated successfully");
      fetchBusinesses(); // Refresh the list
      // Clear form and exit edit mode
      setBusinessName("");
      setLocation("");
      setKeywords("");
      setFacebookUrl("");
      setInstagramUrl("");
      setYoutubeUrl("");
      setLinkedinUrl("");
      setLogo(null);
      setEditMode(false);
      setCurrentBusinessId(null);
      setShowForm(false); // Hide form after updating
    } catch (error) {
      console.error("Error: ", error);
      Alert.alert("Error", `Failed to update business: ${error.message}`);
    }
  };

  const handleEdit = (business) => {
    setEditMode(true);
    setCurrentBusinessId(business.id);
    setBusinessName(business.business_name);
    setLocation(business.Target_Location);
    setKeywords(business.Target_Keywords);
    setFacebookUrl(business.facebook_url);
    setInstagramUrl(business.instagram_url);
    setYoutubeUrl(business.youtube_url);
    setLinkedinUrl(business.linkedin_url);
    setLogo({ uri: business.business_logo });
    setShowForm(true); // Show form when editing
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${CRUD_MYBUSINESS}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Alert.alert("Success", "Business deleted successfully");
      fetchBusinesses(); // Refresh the list
    } catch (error) {
      console.error("Error: ", error);
      Alert.alert("Error", `Failed to delete business: ${error.message}`);
    }
  };

  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const renderBusiness = ({ item }) => (
    <View className="flex-row items-center p-2 border-b border-gray-200">
      {item.business_logo && (
        <Image
          source={{ uri: item.business_logo }}
          className="w-16 h-16 mr-4"
        />
      )}
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.business_name}</Text>
        <Text className="text-sm text-gray-600">
          Location: {item.Target_Location}
        </Text>
        <Text className="text-sm text-gray-600">
          Keywords: {item.Target_Keywords}
        </Text>
        <View className="flex-row mt-2 space-x-4">
          {item.facebook_url ? (
            <TouchableOpacity onPress={() => openURL(item.facebook_url)}>
              <Icon name="facebook" size={24} color="#4267B2" />
            </TouchableOpacity>
          ) : null}
          {item.instagram_url ? (
            <TouchableOpacity onPress={() => openURL(item.instagram_url)}>
              <Icon name="instagram" size={24} color="#C13584" />
            </TouchableOpacity>
          ) : null}
          {item.youtube_url ? (
            <TouchableOpacity onPress={() => openURL(item.youtube_url)}>
              <Icon name="youtube" size={24} color="#FF0000" />
            </TouchableOpacity>
          ) : null}
          {item.linkedin_url ? (
            <TouchableOpacity onPress={() => openURL(item.linkedin_url)}>
              <Icon name="linkedin" size={24} color="#0077B5" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View className="flex-col mt-2 ">
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Icon name="edit" size={24} color="#0077B5" />

          <Text className="text-black font-bold">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="close" size={24} color="#ef4444" />
          <Text className=" text-black font-bold">Delete</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <View className="flex-1 p-5">
      <Button
        title={showForm ? "Hide Form" : "+ Add Business"}
        onPress={() => setShowForm(!showForm)}
      />
      {showForm && (
        <>
          <TextInput
            placeholder="Business Name"
            value={businessName}
            onChangeText={setBusinessName}
            className="h-10 border border-gray-300 mb-4 p-2"
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Target Location"
            value={location}
            onChangeText={setLocation}
            className="h-10 border border-gray-300 mb-4 p-2"
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Target Keywords"
            value={keywords}
            onChangeText={setKeywords}
            className="h-10 border border-gray-300 mb-4 p-2"
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Facebook URL"
            value={facebookUrl}
            onChangeText={setFacebookUrl}
            className="h-10 border border-gray-300 mb-4 p-2"
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="Instagram URL"
            value={instagramUrl}
            onChangeText={setInstagramUrl}
            className="h-10 border border-gray-300 mb-4 p-2"
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="YouTube URL"
            value={youtubeUrl}
            onChangeText={setYoutubeUrl}
            className="h-10 border border-gray-300 mb-4 p-2"
            placeholderTextColor="gray"
          />
          <TextInput
            placeholder="LinkedIn URL"
            value={linkedinUrl}
            onChangeText={setLinkedinUrl}
            className="h-10 border border-gray-300 mb-4 p-2"
            placeholderTextColor="gray"
          />

          <TouchableOpacity
            className=" p-2  bg-[#0064e0] rounded-lg "
            title="Pick a logo"
            onPress={pickImage}
          >
            <Text className=" text-white text-center justify-center">
              Pick a logo
            </Text>
          </TouchableOpacity>

          {logo && (
            <Image source={{ uri: logo.uri }} className="w-24 h-24 my-4" />
          )}
          {editMode ? (
            <Button
              title="Update Business"
              onPress={() => handleUpdate(currentBusinessId)}
            />
          ) : (
            <Button title="Add Business" onPress={handleSave} />
          )}
        </>
      )}
      <FlatList
        data={businesses}
        renderItem={renderBusiness}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1 mt-5"
      />
    </View>
  );
};

export default MyBusiness;
