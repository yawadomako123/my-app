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
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.email, data.name);
        router.replace({ pathname: '/(tabs)', params: { email: data.email, name: data.name } });
      } else {
        const message = await res.text();
        Alert.alert('Login Failed', message || 'Invalid credentials');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to connect to the server.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
        <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.title}>Login</Text>
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
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            <Text style={styles.toggle}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient colors={['#43e97b', '#38f9d7']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={() => router.push('/signup')} style={styles.link}>
              Sign Up
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
  toggle: { color: '#fff', textAlign: 'right', marginBottom: 16 },
  button: { borderRadius: 10, overflow: 'hidden' },
  buttonGradient: { padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  footerText: { color: '#fff', textAlign: 'center', marginTop: 20 },
  link: { color: '#ffd700', fontWeight: 'bold' },
});
