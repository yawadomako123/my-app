import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const handleSignOut = () => {
    logout();
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View>
          <View style={styles.row}>
            <Ionicons name="moon-outline" size={30} color="#333" />
            <Text style={styles.rowText}>Dark Mode</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
          <View style={styles.row}>
            <Ionicons name="sunny-outline" size={30} color="#333" />
            <Text style={styles.rowText}>Light Mode</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Calendar</Text>
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={30} color="#333" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.rowTitle}>Sync to my calendar</Text>
            <Text style={styles.description}>
              Automatically sync all the deadlines and other related items to your calendar
            </Text>
          </View>
          <Switch />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Downloads</Text>

        <View style={styles.item}>
          <Ionicons name="download-outline" size={30} color="#333" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.rowTitle}>Downloads</Text>
            <Text style={styles.description}>Manage all of your offline content</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="wifi-outline" size={30} color="#333" />
          <Text style={styles.rowText}>Download over Wi-Fi only</Text>
          <Switch />
        </View>

        <View style={styles.item}>
          <Ionicons name="square-outline" size={30} color="#333" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.rowTitle}>Video download quality</Text>
            <Text style={styles.description}>Always ask</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="folder-outline" size={30} color="#333" />
          <Text style={styles.rowText}>Download Location</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Push Notification</Text>

        <View style={styles.row}>
          <Ionicons name="notifications-outline" size={30} color="#333" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.rowTitle}>Course-related</Text>
            <Text style={styles.description}>
              Receive notifications about course progress and activities
            </Text>
          </View>
          <Switch />
        </View>

        <View style={styles.row}>
          <Ionicons name="alarm-outline" size={30} color="#333" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.rowTitle}>Study reminders</Text>
            <Text style={styles.description}>
              Receive notifications that remind you to study at times for yourself
            </Text>
          </View>
          <Switch />
        </View>

        <View style={styles.row}>
          <Ionicons name="pricetag-outline" size={30} color="#333" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.rowTitle}>Promotions</Text>
            <Text style={styles.description}>Receive notifications on offers and promotions</Text>
          </View>
          <Switch />
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.row}>
          <Ionicons name="globe-outline" size={30} color="#333" />
          <Text style={styles.rowText}>Change Preferred Language</Text>
          <Ionicons name="open-outline" size={25} color="#333" style={{ marginLeft: 'auto' }} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>

        <View style={styles.row}>
          <Ionicons name="person-outline" size={30} color="#333" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.rowTitle}>Hello! {user?.name}</Text>
            <Text style={styles.description}>Signed in as {user?.email}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.row} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={30} color="#333" />
          <Text style={styles.rowText}>Sign Out</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Ionicons name="mail-outline" size={30} color="#333" />
          <Text style={styles.rowText}>Add a Recovery Email</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="receipt-outline" size={30} color="#333" />
          <Text style={styles.rowText}>My subscriptions</Text>
        </View>

        <View style={styles.row}>
          <FontAwesome name="google" size={30} color="#DB4437" />
          <Text style={styles.rowText}>Unlink Google Account</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.row}>
          <Ionicons name="help-circle-outline" size={30} color="#000" />
          <Text style={styles.rowText}>Learner Help Center</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>

        <View style={styles.row}>
          <Ionicons name="document-outline" size={30} color="#000" />
          <Text style={styles.rowText}>Terms</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="document-lock-outline" size={30} color="#000" />
          <Text style={styles.rowText}>Privacy Policy</Text>
        </View>
      </View>

      <View style={[styles.row, { justifyContent: 'flex-start', paddingVertical: 10 }]}>
        <Ionicons name="trash-outline" size={30} color="#000" />
        <Text style={[styles.rowText, { color: 'red', marginLeft: 10 }]}>Delete Account</Text>
      </View>

      <View style={{ marginVertical: 20, alignItems: 'center' }}>
        <Text style={{ color: '#666' }}>
          Learnova v1.0{'\n'}
          <Text style={{ fontWeight: 'bold' }}>Mobile Dev G48 ©2025</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 60,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  rowText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flexShrink: 1,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 3,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
});

export default Settings;