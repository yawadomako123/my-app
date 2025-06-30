import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

// ✅ Use your local IP if testing on device over Wi-Fi
const API_BASE_URL = 'http://10.30.22.122:9091/api/auth';  // Update this IP if needed

export default function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !name || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Account created. Please log in.');
        router.replace('/login');
      } else {
        const data = await response.text();
        Alert.alert('Signup Failed', data || 'Something went wrong.');
      }
    } catch (err) {
      Alert.alert('Network Error', 'Could not connect to backend.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
        <KeyboardAvoidingView
          style={styles.inner}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.title}>Create Account</Text>

          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={setName}
            value={name}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text onPress={() => router.push('/login')} style={styles.link}>
              Login
            </Text>
          </Text>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  inner: { justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 32, color: '#fff' },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  button: { borderRadius: 10, overflow: 'hidden', marginTop: 10 },
  buttonGradient: { padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footerText: { color: '#fff', textAlign: 'center', marginTop: 20 },
  link: { color: '#ffd700', fontWeight: 'bold' },
});
