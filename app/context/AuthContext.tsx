import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
  userToken: string | null;
  user: any;
  loading: boolean;
  login: (token: string, userData: any) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUserToken(token);
        // Optionally load user details here if you have them stored
      }
    } catch (e) {
      console.error('Failed to load token', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const login = async (token: string, userData: any) => {
    try {
      await AsyncStorage.setItem('token', token);
      setUserToken(token);
      setUser(userData);
    } catch (e) {
      console.error('Login error:', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUserToken(null);
      setUser(null);
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
