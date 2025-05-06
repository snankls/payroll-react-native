import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) setUserToken(token);
    setLoading(false);
  };

  useEffect(() => {
    loadToken();
  }, []);

  const login = async (token: string, userData: any) => {
    await AsyncStorage.setItem('token', token);
    setUserToken(token);
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUserToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
