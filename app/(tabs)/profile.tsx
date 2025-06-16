import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lightTheme = {
  background: '#FDF6F0',
  card: '#FFFFFF',
  primary: '#6366F1',
  accent: '#F97316',
  text: '#1F2937',
  muted: '#6B7280',
  border: '#E5E7EB',
  tag: '#DBEAFE',
};

const darkTheme = {
  background: '#1F2937',
  card: '#111827',
  primary: '#8B5CF6',
  accent: '#F59E0B',
  text: '#F3F4F6',
  muted: '#9CA3AF',
  border: '#374151',
  tag: '#4B5563',
};

const progressData = {
  completedCourses: 5,
  inProgressCourses: 2,
  recentCourses: ['Web Development', 'UI/UX Design', 'Python Programming'],
  skills: ['JavaScript', 'Design Thinking', 'React Native', 'Data Analysis'],
};

export default function ProfileScreen() {
  const theme = lightTheme; // Force light theme

  const { name: routeName, email: routeEmail } = useLocalSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(routeName || '');
  const [email, setEmail] = useState(routeEmail || '');

  const [profileImage, setProfileImage] = useState<string | null>('https://i.pravatar.cc/150?img=47');

  const toggleEdit = () => {
    if (isEditing) {
      console.log('Saved:', { name, email, profileImage });
    }
    setIsEditing(!isEditing);
  };

  const pickImage = async () => {
    if (!isEditing) return; 
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need gallery permissions to change your profile picture!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (e) {
      console.error('Image picker error:', e);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      
      {/* Added the settings logo to allow user to personalize the app */}
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 20 }}>
       <TouchableOpacity onPress={() => router.push('/settings')}>
      <Ionicons name="settings-outline" size={30} color="#333" />
      </TouchableOpacity>
   </View>


      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
            <Image source={{ uri: profileImage! }} style={styles.avatar} />
            {isEditing && (
              <View style={[styles.cameraIconWrapper, { backgroundColor: theme.primary }]}>
                <Ionicons name="camera" size={18} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
          <Text style={[styles.name, { color: theme.text }]}>{name || 'Guest User'}</Text>
          <Text style={[styles.email, { color: theme.muted }]}>{email || 'guest@example.com'}</Text>

          <TouchableOpacity style={[styles.editBtn, { borderColor: theme.primary }]} onPress={toggleEdit}>
            <Ionicons name={isEditing ? 'save-outline' : 'create-outline'} size={18} color={theme.primary} />
            <Text style={[styles.editText, { color: theme.primary }]}>
              {isEditing ? 'Save' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </View>


        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Account Info</Text>
          <View style={styles.info}>
            <Text style={[styles.label, { color: theme.muted }]}>Name</Text>
            {isEditing ? (
              <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={theme.muted}
              />
            ) : (
              <Text style={[styles.value, { color: theme.text }]}>{name}</Text>
            )}
          </View>
          <View style={styles.info}>
            <Text style={[styles.label, { color: theme.muted }]}>Email</Text>
            {isEditing ? (
              <TextInput
                style={[styles.input, { borderColor: theme.border, color: theme.text }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Your email"
                placeholderTextColor={theme.muted}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={[styles.value, { color: theme.text }]}>{email}</Text>
            )}
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.tag }]}>
            <Ionicons name="checkmark-circle-outline" size={26} color={theme.text} />
            <Text style={[styles.statValue, { color: theme.text }]}>{progressData.completedCourses}</Text>
            <Text style={[styles.statLabel, { color: theme.muted }]}>Completed</Text>

          </View>
          <View style={[styles.statCard, { backgroundColor: theme.tag }]}>
            <Ionicons name="time-outline" size={26} color={theme.text} />
            <Text style={[styles.statValue, { color: theme.text }]}>{progressData.inProgressCourses}</Text>
            <Text style={[styles.statLabel, { color: theme.muted }]}>In Progress</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Skills</Text>
          <View style={styles.tagsContainer}>
            {progressData.skills.map((skill, i) => (
              <View key={i} style={[styles.tag, { backgroundColor: theme.tag }]}>
                <Text style={[styles.tagText, { color: theme.primary }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.text }]}>Recently Viewed</Text>
          {progressData.recentCourses.map((course, i) => (
            <View key={i} style={styles.recent}>
              <Ionicons name="book-outline" size={18} color={theme.accent} />
              <Text style={[styles.recentText, { color: theme.text }]}>{course}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    padding: 6,
    borderRadius: 20,
  },
  name: { fontSize: 24, fontWeight: '700' },
  email: { fontSize: 15, marginBottom: 8 },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 8,
  },
  editText: { marginLeft: 6, fontWeight: '600', fontSize: 15 },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  info: { marginBottom: 14 },
  label: { fontSize: 14, marginBottom: 6 },
  value: { fontSize: 16, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 12,
    padding: 20,
  },
  statValue: { fontSize: 22, fontWeight: '700', marginTop: 8 },
  statLabel: { fontSize: 14, marginTop: 4 },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontWeight: '600',
    fontSize: 14,
  },
  recent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  recentText: { marginLeft: 10, fontSize: 15, fontWeight: '500' },
});