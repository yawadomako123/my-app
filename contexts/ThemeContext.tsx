// contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appearance } from 'react-native';

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = Appearance.getColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = (value: boolean) => setDarkMode(value);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
