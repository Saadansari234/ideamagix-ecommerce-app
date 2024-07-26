// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create Context
export const AuthContext = createContext();

// Create Provider
export const AuthProvider = ({ children }) => {
  const [isGuest, setIsGuest] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load auth status from AsyncStorage when component mounts
    const loadAuthStatus = async () => {
      try {
        const storedGuestStatus = await AsyncStorage.getItem('isGuest');
        const storedToken = await AsyncStorage.getItem('token');
        
        if (storedGuestStatus === 'true') {
          setIsGuest(true);
        }

        if (storedToken) {
          setToken(storedToken);
        }
      } catch (error) {
        console.error('Failed to load auth status:', error);
      }
    };

    loadAuthStatus();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('isGuest', 'false');
        setToken(data.token);
        setIsGuest(false);
        return { success: true };
      } else {
        return { success: false, message: data.message || 'An error occurred' };
      }
    } catch (error) {
      console.error('Login failed', error);
      return { success: false, message: 'An error occurred' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('isGuest');
      setToken(null);
      setIsGuest(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const useGuestAccount = async () => {
    try {
      await AsyncStorage.setItem('isGuest', 'true');
      setIsGuest(true);
    } catch (error) {
      console.error('Failed to set guest account', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isGuest, token, login, logout, useGuestAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
