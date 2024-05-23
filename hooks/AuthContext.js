import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    try {
      const response = await fetch('https://digitalgita.cyberspacedigital.in/api/CRUD.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailaddress: email,
          password
        })
      });

      const data = await response.json();

      if (data.status === 'success') {
        await SecureStore.setItemAsync('userToken', JSON.stringify({ email }));
        setUser({ email });
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: 'An error occurred. Please try again.' };
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUser(null);
  };

  const loadUser = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');
    if (userToken) {
      setUser(JSON.parse(userToken));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
