import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useAuth } from "../../../hooks/AuthContext"; // Adjust the path to your AuthContext

const AllWebsites = () => {
  const { user } = useAuth(); // Use auth context to get user details
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUrls();
    const interval = setInterval(() => {
      triggerUrlCheck();
      fetchUrls();
    }, 60000); // 1 minute in milliseconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const fetchUrls = async () => {
    try {
      if (user?.email) {
        const response = await axios.get(
          `https://digitalgita.cyberspacedigital.in/api/MyWebsites/fetch_urls.php?email=${user.email}`
        );
        setUrls(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const triggerUrlCheck = async () => {
    try {
      await axios.get(
        "https://digitalgita.cyberspacedigital.in/api/MyWebsites/trigger_url_check.php"
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const addUrl = async () => {
    // Automatically add "https://" if missing
    let formattedUrl = url.trim();
    if (!formattedUrl.match(/^https?:\/\//)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      const response = await axios.post(
        "https://digitalgita.cyberspacedigital.in/api/MyWebsites/add_url.php",
        { url: formattedUrl, owner: user?.email }
      );
      alert(response.data.message);
      setUrl("");
      fetchUrls();
    } catch (err) {
      alert(err.message);
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
        <Text className="text-red-500 text-xl">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5">
      <View className="flex flex-col items-center w-full rounded-xl drop-shadow-2xl">
      
        <View className="flex-row space-x-2">
          <Text className="text-md text-black mt-2">{user?.email}</Text>
        </View>
      </View>

      <TextInput
        value={url}
        onChangeText={setUrl}
        placeholder="Enter URL"
        className="border p-2 mb-4"
      />
      <Button title="Add URL" onPress={addUrl} />

      <FlatList
        data={urls}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-300 flex-row justify-between items-center">
            <View>
              <Text className="text-lg font-bold">{item.url}</Text>
              <Text className="text-sm text-gray-500">
                Last Checked: {item.last_checked}
              </Text>
            </View>
            <View className="flex-row items-center">
              {item.status === "Online" ? (
                <FontAwesome name="circle" size={12} color="green" />
              ) : (
                <FontAwesome name="circle" size={12} color="red" />
              )}
              <Text
                className={`text-sm ${
                  item.status === "Online" ? "text-green-500" : "text-red-500"
                }`}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AllWebsites;
