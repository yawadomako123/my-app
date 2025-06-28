import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

// Keep splash screen visible until we hide it manually
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after a short delay (or immediately if you prefer)
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 100); // Adjust delay if needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      {/* Let Expo Router automatically handle all screens */}
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </AuthProvider>
  );
}
