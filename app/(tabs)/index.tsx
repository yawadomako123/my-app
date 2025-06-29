import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Video } from 'expo-av';
import { useAuth } from '../../contexts/AuthContext';
import { Asset } from 'expo-asset';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../constants/Colors';

const categories = [
  {
    name: 'Technology',
    description: 'Code, build, and master the future.',
    icon: 'code-slash-outline',
    search: 'Development',
  },
  {
    name: 'Business',
    description: 'Marketing, leadership, and strategy.',
    icon: 'briefcase-outline',
    search: 'Business',
  },
  {
    name: 'Design',
    description: 'UI, UX, and creative skills.',
    icon: 'color-palette-outline',
    search: 'Design',
  },
];

const courses = [
  {
    id: '1',
    title: 'Introduction to Python',
    instructor: 'Dr. Jane Smith',
    image: require('../../assets/images/python.jpg'),
    progress: 0.65,
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    instructor: 'Prof. John Doe',
    image: require('../../assets/images/AI.jpg'),
    progress: 0.3,
  },
  {
    id: '3',
    title: 'Web Development Bootcamp',
    instructor: 'Alex Johnson',
    image: require('../../assets/images/web-development.jpg'),
    progress: 0.1,
  },
];

const recentCourses = [
  { id: '4', title: 'UI/UX Design', category: 'Design' },
  { id: '5', title: 'Python Programming', category: 'Technology' },
  { id: '6', title: 'Business Analytics', category: 'Business' },
];

const videoAssets: Record<string, any> = {
  '4': require('../../assets/videos/ui-design.mp4'),
  '5': require('../../assets/videos/python-programming.mp4'),
  '6': require('../../assets/videos/business-analytics.mp4'),
  default: require('../../assets/videos/default.mp4'),
};

const getVideoUri = (id: string): string => {
  const source = videoAssets[id] || videoAssets.default;
  return Asset.fromModule(source).uri;
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export default function InterfaceScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const Colors = getThemeColors(isDarkMode);
  const [search, setSearch] = useState('');
  const avatarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(avatarAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const navigateCourse = (id: string) => router.push(`/courses/${id}`);
  const navigateExplore = (filter?: string) =>
    router.push({ pathname: '/explore', params: filter ? { search: filter } : {} });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.push('/notifications')}>
          <Ionicons name="notifications-outline" size={26} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: Colors.text }]}> 
            {getGreeting()}, <Text style={{ color: Colors.primary }}>{user?.name || 'Learner'} 👋</Text>
          </Text>
          <Text style={[styles.subtitle, { color: Colors.muted }]}>Ready to learn?</Text>
        </View>

        <View style={[styles.searchBar, { backgroundColor: Colors.surface }]}>
          <Ionicons name="search-outline" size={20} color={Colors.muted} />
          <TextInput
            placeholder="Search courses..."
            placeholderTextColor={Colors.muted}
            style={[styles.searchInput, { color: Colors.text }]}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.text }]}>Categories</Text>
            <TouchableOpacity onPress={() => navigateExplore()}>
              <Text style={[styles.seeAll, { color: Colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesColumn}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={[styles.categoryCard, { backgroundColor: Colors.primarySoft }]}
                onPress={() => navigateExplore(cat.search)}
              >
                <Ionicons name={cat.icon as any} size={30} color={Colors.primary} />
                <Text style={[styles.categoryName, { color: Colors.text }]}>{cat.name}</Text>
                <Text style={[styles.categoryDesc, { color: Colors.muted }]}>{cat.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.text }]}>Continue Learning</Text>
            <TouchableOpacity onPress={() => navigateExplore()}>
              <Text style={[styles.seeAll, { color: Colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.continueLearningContainer}>
            {courses.map((course) => (
              <TouchableOpacity key={course.id} style={[styles.courseCard, { backgroundColor: Colors.card }]} onPress={() => navigateCourse(course.id)}>
                <Image source={course.image} style={styles.courseImage} />
                <View style={styles.courseContent}>
                  <Text style={[styles.courseTitle, { color: Colors.text }]}>{course.title}</Text>
                  <Text style={[styles.courseInstructor, { color: Colors.muted }]}>{course.instructor}</Text>
                  <View style={[styles.progressBar, { backgroundColor: Colors.surface }]}>
                    <View style={[styles.progressFill, { backgroundColor: Colors.primary, width: `${course.progress * 100}%` }]} />
                  </View>
                  <Text style={[styles.progressText, { color: Colors.muted }]}>{Math.round(course.progress * 100)}% complete</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.text }]}>Recently Viewed</Text>
            <TouchableOpacity onPress={() => navigateExplore()}>
              <Text style={[styles.seeAll, { color: Colors.primary }]}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={recentCourses}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.videoCard} onPress={() => navigateCourse(item.id)}>
                <Video
                  source={{ uri: getVideoUri(item.id) }}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  isMuted
                  style={styles.video}
                />
                <View style={styles.videoOverlay}>
                  <Ionicons name="play-circle-outline" size={24} color="#fff" />
                  <Text style={styles.videoTitle}>{item.title}</Text>
                  <Text style={styles.videoCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: { padding: 20, alignItems: 'flex-end', marginTop: 12 },
  scrollContent: { padding: 20 },
  header: { alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 22, fontWeight: '700' },
  subtitle: { fontSize: 15 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 16 },
  section: { marginBottom: 28 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  seeAll: { fontSize: 14, fontWeight: '600' },
  categoriesColumn: { flexDirection: 'column', gap: 20, paddingBottom: 15 },
  categoryCard: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  categoryDesc: { fontSize: 14, marginTop: 5 },
  continueLearningContainer: { paddingBottom: 20 },
  courseCard: {
    width: 190,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  courseImage: { width: '100%', height: 100 },
  courseContent: { padding: 12 },
  courseTitle: { fontSize: 16, fontWeight: '700' },
  courseInstructor: { fontSize: 14, marginTop: 4 },
  progressBar: {
    height: 4,
    borderRadius: 4,
    marginTop: 8,
  },
  progressFill: { height: '100%', borderRadius: 4 },
  progressText: { fontSize: 13, marginTop: 4 },
  videoCard: {
    width: 200,
    height: 130,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  videoOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  videoTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  videoCategory: {
    color: '#eee',
    fontSize: 12,
    marginTop: 2,
  },
});
