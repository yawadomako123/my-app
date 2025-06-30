import axios from 'axios';
import React, { createContext, ReactNode, useContext, useState } from 'react';

type User = {
  name: string;
  email: string;
  profileImage?: string;
  token?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfileImage: (uri: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Replace with your actual machine IP
const API_BASE = 'http://10.30.22.122:9091/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      setUser({
        email: response.data.email,
        name: response.data.name,
        profileImage: response.data.profileImage || 'https://i.pravatar.cc/150?img=47',
        token: response.data.token,
      });

      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE}/auth/signup`, {
        name,
        email,
        password,
      });

      setUser({
        email: response.data.email,
        name: response.data.name,
        profileImage: response.data.profileImage || 'https://i.pravatar.cc/150?img=47',
        token: response.data.token,
      });

      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => setUser(null);

  const updateProfileImage = (uri: string) => {
    setUser((prev) => prev ? { ...prev, profileImage: uri } : prev);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
