import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, Platform, StatusBar } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const Header = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleProfileNavigation = () => {
    router.push('/Profile');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfileNavigation}>
          <Image
            source={{ uri: user?.imageUrl }}
            style={styles.profileImage}
          />
        </TouchableOpacity>

        <View style={styles.userInfo}>
          <TouchableOpacity onPress={handleProfileNavigation}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userName}>{user?.fullName}</Text>
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
