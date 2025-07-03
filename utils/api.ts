// utils/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.8.120:8080/api'; // your local backend IP

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to all requests (if available)
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// ✅ Login User
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    return response.data; // expected to return token/message/user (your backend controls this)
  } catch (error: any) {
    throw new Error(
      error?.response?.data || 'Login failed. Please try again.'
    );
  }
};

// ✅ Register User
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await API.post('/users/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data || 'Registration failed. Please try again.'
    );
  }
};

export default API;
