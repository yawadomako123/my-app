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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
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
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
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
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
