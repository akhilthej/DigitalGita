import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthContext'; // Adjust the path if needed
import { useRouter } from 'expo-router';

const Header = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://digitalgita.cyberspacedigital.in/api/CRUD.php?emailaddress=${user?.email}`);
        const data = await response.json();
        
        if (data) {
          setUserInfo(data);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  const handleProfileNavigation = () => {
    router.push('/Profile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfileNavigation}>
          <Image
            source={{ uri: userInfo?.imageUrl || 'https://via.placeholder.com/40' }} // Default image if userInfo or imageUrl is not available
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <TouchableOpacity onPress={handleProfileNavigation}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userName}>{userInfo?.name || 'Loading'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#134e4a',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#134e4a',
  },
  profileImage: {
    borderRadius: 50,
    width: 40,
    height: 40,
  },
  userInfo: {
    paddingLeft: 8,
  },
  welcomeText: {
    fontSize: 13,
    color: 'white',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Header;
