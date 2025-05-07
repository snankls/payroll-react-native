// utils/axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        await AsyncStorage.removeItem('userToken');
        // optionally trigger a logout event
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
