// app/(tabs)/index.tsx

import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Optional: Show alert before navigating
    // Alert.alert('Navigation', 'You tapped Get Started!');

    // ✅ Navigate to /login
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Coursera_logo.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Coursera Clone</Text>
      <Text style={styles.subtitle}>Learn anything, anytime, anywhere.</Text>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0056D2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 180,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#0056D2',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
