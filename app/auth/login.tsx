import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { loginUser } from '../../utils/api'; // ✅ Correct import

const Login = () => {
  const router = useRouter();
  const scale = useRef(new Animated.Value(1)).current;

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password.trim());

  const handleLogin = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be 8+ characters and include upper, lower, number, and a symbol'
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    try {
      const response = await loginUser(email, password);

      // Expecting response to be like: "Login successful"
      if (typeof response === 'string' && response.toLowerCase().includes('success')) {
        await AsyncStorage.setItem('token', 'placeholder-token'); // 🔐 Replace with real token when available
        router.replace('/(tabs)');
      } else {
        Alert.alert('Login Failed', response || 'Invalid credentials');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'Something went wrong.');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleAppleLogin = () => {
    if (Platform.OS !== 'ios') {
      Alert.alert('Unsupported', 'Apple sign-in is only available on iOS devices.');
      return;
    }
    console.log('Apple login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView style={styles.inner} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <Text style={styles.header}>Let's Sign you in</Text>

          {/* Username */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={20} color="#999" style={styles.iconWrapper} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="email" size={20} color="#999" style={styles.iconWrapper} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#999" style={styles.iconWrapper} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <MaterialCommunityIcons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.error}>{passwordError}</Text> : null}
          </View>

          {/* Remember Me */}
          <View style={styles.optionsRow}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.rememberBoxRow}>
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <AntDesign name="check" size={14} color="#fff" />}
              </View>
              <Text style={styles.rememberMe}>Remember Me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/auth/forgot-password')}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <Pressable
            onPressIn={() => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start()}
            onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
            onPress={handleLogin}
          >
            <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
              <Text style={styles.buttonText}>Sign In</Text>
              <View style={styles.iconCircle}>
                <AntDesign name="arrowright" size={30} color="#0056D2" />
              </View>
            </Animated.View>
          </Pressable>

          <Text style={styles.orText}>Or log in with</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={handleGoogleLogin}>
              <AntDesign name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleAppleLogin}>
              <AntDesign name="apple1" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/auth/signup')}>
            <Text style={styles.signupLink}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconWrapper: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
  },
  error: {
    color: '#EA5455',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  rememberBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.light.primary,
  },
  rememberMe: {
    color: Colors.light.text,
    fontSize: 14,
    marginLeft: 6,
  },
  forgotPassword: {
    color: Colors.light.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0056D2',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconCircle: {
    backgroundColor: '#fff',
    borderRadius: 999,
    padding: 6,
    position: 'relative',
    left: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orText: {
    textAlign: 'center',
    color: Colors.light.muted,
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
    elevation: 2,
  },
  signupLink: {
    textAlign: 'center',
    color: Colors.light.primary,
    marginTop: 30,
    fontWeight: '600',
  },
});
