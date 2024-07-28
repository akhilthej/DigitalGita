import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../hooks/AuthContext";
import axios from "axios";
import { useRouter } from "expo-router";

const ProfileEdit = () => {
  const router = useRouter();
  const { user, loading, setUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [sex, setSex] = useState(user?.sex || "");
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    const name = `${firstName} ${lastName}`;

    if (!name || !email || !phoneNumber || !sex || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    setUpdating(true);

    try {
      const response = await axios.put(
        "https://digitalgita.cyberspacedigital.in/api/CRUD.php",
        {
          name,
          emailaddress: email,
          phonenumber: phoneNumber,
          sex,
          password,
        }
      );

      if (response.data.status === "success") {
        Alert.alert("Success", "Profile updated successfully");
        setUser({
          ...user,
          name,
          email,
          phoneNumber,
          sex,
        });
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to update profile"
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <View className='flex-1'>
      <View className='flex-1 p-5 justify-center'>
        <Text className='text-2xl font-bold mb-5 text-center'>Edit Profile</Text>
        <TextInput
          className='bg-white p-3 rounded-md mb-2 text-base'
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="gray"
        />
        <TextInput
          className='bg-white p-3 rounded-md mb-2 text-base'
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="gray"
        />
        <TextInput
          className='bg-white p-3 rounded-md mb-2 text-base'
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          editable={false} // Prevents editing of email field
          placeholderTextColor="gray"
        />
        <TextInput
          className='bg-white p-3 rounded-md mb-2 text-base'
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor="gray"
        />
        <TextInput
          className='bg-white p-3 rounded-md mb-2 text-base'
          placeholder="Sex"
          value={sex}
          onChangeText={setSex}
          placeholderTextColor="gray"
        />
        <TextInput
          className='bg-white p-3 rounded-md mb-4 text-base'
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="gray"
        />
        <TouchableOpacity
          className={`p-4 rounded-md items-center ${updating || loading ? 'bg-gray-400' : 'bg-primary-100'}`}
          onPress={handleUpdate}
          disabled={updating || loading}
        >
          <Text className='text-white text-base font-bold'>
            {updating ? "Updating..." : "Update Profile"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileEdit;
