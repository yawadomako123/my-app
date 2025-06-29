import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { getThemeColors } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';


const profile = () => {

  const { isDarkMode } = useTheme();
const colors = getThemeColors(isDarkMode);
const { user } = useAuth();

const [isEditing, setIsEditing] = useState(false);
const [name, setName] = useState(user?.name || '');
const [email, setEmail] = useState(user?.email || '');
const [bio, setBio] = useState(user?.bio || '');
const [profileImage, setProfileImage] = useState(user?.image || null);
const [showSkillInfo, setShowSkillInfo] = useState<string | null>(null);

const avatarAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.spring(avatarAnim, {
    toValue: 1,
    useNativeDriver: true,
  }).start();
}, []);

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  if (!result.canceled) {
    setProfileImage(result.assets[0].uri);
  }
};

const toggleEdit = () => {
  if (isEditing) {
    // Save logic here if needed
  }
  setIsEditing(prev => !prev);
};

const progressData = {
  completedCourses: 8,
  inProgressCourses: 4,
  skills: ['JavaScript', 'React', 'UI/UX Design', 'Python'],
  recentCourses: ['React Native Basics', 'UX Research', 'Advanced JS'],
};

const completedPercent = progressData.completedCourses / (progressData.completedCourses + progressData.inProgressCourses);
const inProgressPercent = progressData.inProgressCourses / (progressData.completedCourses + progressData.inProgressCourses);

const profileCompletion = Math.floor(
  ((!!name ? 1 : 0) + (!!email ? 1 : 0) + (!!bio ? 1 : 0) + (!!profileImage ? 1 : 0)) / 4 * 100
);

const badges = [
  { label: 'Top Learner', icon: 'star', color: '#FACC15' },
  { label: 'React Pro', icon: 'logo-react', color: '#60A5FA' },
  { label: 'UX Master', icon: 'color-palette', color: '#F472B6' },
];

const socialLinks = [
  { label: 'LinkedIn', icon: 'logo-linkedin', url: 'https://linkedin.com', color: '#0A66C2' },
  { label: 'GitHub', icon: 'logo-github', url: 'https://github.com', color: '#000' },
  { label: 'Twitter', icon: 'logo-twitter', url: 'https://twitter.com', color: '#1DA1F2' },
];

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 20 }}>
      <TouchableOpacity onPress={() => router.push('/settings')}>
        <Ionicons name="settings-outline" size={30} color={colors.text} />
      </TouchableOpacity>
    </View>

    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <View style={styles.avatarAccent}>
          <Animated.View
            style={{
              transform: [{ scale: avatarAnim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.18,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
              <Animated.Image source={{ uri: profileImage! }} style={styles.avatar} />
              {isEditing && (
                <View style={[styles.cameraIconWrapper, { backgroundColor: colors.primary }]}>
                  <Ionicons name="camera" size={18} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>{user?.name || 'Guest User'}</Text>
        <Text style={[styles.email, { color: colors.muted }]}>{user?.email || 'guest@example.com'}</Text>

        <TouchableOpacity style={[styles.editBtn, { borderColor: colors.primary }]} onPress={toggleEdit}>
          <Ionicons name={isEditing ? 'save-outline' : 'create-outline'} size={18} color={colors.primary} />
          <Text style={[styles.editText, { color: colors.primary }]}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Account Info</Text>
        <View style={styles.info}>
          <Text style={[styles.label, { color: colors.muted }]}>Name</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={colors.muted}
            />
          ) : (
            <Text style={[styles.value, { color: colors.text }]}>{name}</Text>
          )}
        </View>
        <View style={styles.info}>
          <Text style={[styles.label, { color: colors.muted }]}>Email</Text>
          {isEditing ? (
            <TextInput
              style={[styles.input, { borderColor: colors.border, color: colors.text }]}
              value={email}
              onChangeText={setEmail}
              placeholder="Your email"
              placeholderTextColor={colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          ) : (
            <Text style={[styles.value, { color: colors.text }]}>{email}</Text>
          )}
        </View>
      </View>

      <View style={styles.progressCard}>
        <Text style={[styles.cardTitle, { color: colors.text, marginBottom: 10 }]}>Course Progress</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${completedPercent * 100}%` }]} />
          <View style={[styles.progressBarFill, { backgroundColor: colors.accent, width: `${inProgressPercent * 100}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={[styles.progressLabel, { color: colors.primary }]}>Completed: {progressData.completedCourses}</Text>
          <Text style={[styles.progressLabel, { color: colors.accent }]}>In Progress: {progressData.inProgressCourses}</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: colors.tag }]}>
          <Ionicons name="checkmark-circle-outline" size={26} color={colors.text} />
          <Text style={[styles.statValue, { color: colors.text }]}>{progressData.completedCourses}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Completed</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.tag }]}>
          <Ionicons name="time-outline" size={26} color={colors.text} />
          <Text style={[styles.statValue, { color: colors.text }]}>{progressData.inProgressCourses}</Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>In Progress</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Skills</Text>
        <View style={styles.tagsContainer}>
          {progressData.skills.map((skill, i) => (
            <View key={i} style={[styles.tag, { backgroundColor: colors.tag }]}>
              <Text style={[styles.tagText, { color: colors.primary }]}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Recently Viewed</Text>
        {progressData.recentCourses.map((course, i) => (
          <View key={i} style={styles.recent}>
            <Ionicons name="book-outline" size={18} color={colors.accent} />
            <Text style={[styles.recentText, { color: colors.text }]}>{course}</Text>
          </View>
        ))}
      </View>

      <View style={styles.badgeRow}>
        {badges.map(badge => (
          <View key={badge.label} style={[styles.badge, { backgroundColor: badge.color + '22' }]}>
            <Ionicons name={badge.icon as any} size={18} color={badge.color} />
            <Text style={[styles.badgeText, { color: badge.color }]}>{badge.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.profileCompletionCard}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Profile Completion</Text>
        <View style={styles.profileCompletionRow}>
          <AnimatedCircularProgress
            size={60}
            width={7}
            fill={profileCompletion}
            tintColor={colors.primary}
            backgroundColor={colors.border}
            rotation={0}
            lineCap="round"
          >
            {() => <Text style={{ fontWeight: 'bold', color: colors.primary }}>{profileCompletion}%</Text>}
          </AnimatedCircularProgress>
          <View style={{ marginLeft: 18 }}>
            <Text style={{ color: colors.text, fontWeight: '600', fontSize: 16 }}>
              {profileCompletion === 100 ? 'Profile Complete!' : 'Almost there!'}
            </Text>
            {profileCompletion < 100 && (
              <Text style={{ color: colors.muted, fontSize: 13 }}>
                Add more info to complete your profile.
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Bio</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, { borderColor: colors.border, color: colors.text, minHeight: 60 }]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            placeholderTextColor={colors.muted}
            multiline
          />
        ) : (
          <Text style={[styles.value, { color: colors.text }]}>{bio}</Text>
        )}
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Social Links</Text>
        <View style={styles.socialRow}>
          {socialLinks.map(link => (
            <TouchableOpacity
              key={link.label}
              style={[styles.socialBtn, { borderColor: link.color }]}
              onPress={() => Linking.openURL(link.url)}
            >
              <Ionicons name={link.icon as any} size={20} color={link.color} />
              <Text style={[styles.socialText, { color: link.color }]}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.progressCirclesRow}>
        <View style={styles.progressCircleItem}>
          <AnimatedCircularProgress
            size={70}
            width={8}
            fill={completedPercent * 100}
            tintColor={colors.primary}
            backgroundColor={colors.border}
            rotation={0}
            lineCap="round"
          >
            {() => (
              <Text style={{ fontWeight: 'bold', color: colors.primary, fontSize: 16 }}>
                {progressData.completedCourses}
              </Text>
            )}
          </AnimatedCircularProgress>
          <Text style={{ color: colors.text, marginTop: 6, fontWeight: '600' }}>Completed</Text>
        </View>

        <View style={styles.progressCircleItem}>
          <AnimatedCircularProgress
            size={70}
            width={8}
            fill={inProgressPercent * 100}
            tintColor={colors.accent}
            backgroundColor={colors.border}
            rotation={0}
            lineCap="round"
          >
            {() => (
              <Text style={{ fontWeight: 'bold', color: colors.accent, fontSize: 16 }}>
                {progressData.inProgressCourses}
              </Text>
            )}
          </AnimatedCircularProgress>
          <Text style={{ color: colors.text, marginTop: 6, fontWeight: '600' }}>In Progress</Text>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Skills</Text>
        <View style={styles.tagsContainer}>
          {progressData.skills.map((skill, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.tag, { backgroundColor: colors.tag }]}
              onPress={() => setShowSkillInfo(skill)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tagText, { color: colors.primary }]}>{skill}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {showSkillInfo && (
        <View style={styles.skillModal}>
          <View style={styles.skillModalContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>{showSkillInfo}</Text>
            <Text style={{ color: colors.muted, marginBottom: 16 }}>{showSkillInfo} is one of your top skills!</Text>
            <TouchableOpacity onPress={() => setShowSkillInfo(null)} style={styles.closeSkillBtn}>
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Recent Activity</Text>
        <View style={styles.timeline}>
          <View style={styles.timelineDot} />
          <Text style={styles.timelineText}>Completed {"Python Programming"} course</Text>
        </View>
        <View style={styles.timeline}>
          <View style={styles.timelineDot} />
          <Text style={styles.timelineText}>Added {"React Native"} to skills</Text>
        </View>
        <View style={styles.timeline}>
          <View style={styles.timelineDot} />
          <Text style={styles.timelineText}>Viewed {"UI/UX Design"}</Text>
        </View>
      </View>
    </ScrollView>
  </SafeAreaView>

  )
}

export default profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarAccent: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    padding: 4,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 999,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
  },
  email: {
    fontSize: 14,
    marginBottom: 8,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  editText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  info: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  progressCard: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  progressBarBg: {
    height: 10,
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  progressBarFill: {
    height: 10,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  recent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentText: {
    marginLeft: 8,
    fontSize: 14,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  profileCompletionCard: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  profileCompletionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  socialRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  socialText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  progressCirclesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  progressCircleItem: {
    alignItems: 'center',
  },
  skillModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  skillModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
  },
  closeSkillBtn: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366F1',
    marginRight: 8,
  },
  timelineText: {
    fontSize: 13,
  },
});
