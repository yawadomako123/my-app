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
import { useAuth } from '../../contexts/AuthContext';

const Colors = {
  light: {
background: '#F8FAFC',
  text: '#1c1c1e',
  primary: '#0056D2',
  border: '#e0e0e0',
  accent: '#F97316',
  muted: '#6B7280',
  card: '#ffffff',
  shadow: '#00000010',
  surface: '#f2f2f2',
  category: {
    Technology: '#C7DFFF',
    Business: '#FFF2E6',
    Design: '#F6EDFF',
    },
  },
};

const categories = [
  {
    name: 'Technology',
    // description: 'Code, build, and master the future.',
    icon: 'code-slash-outline',
    search: 'Development',
  },
  {
    name: 'Business',
    // description: 'Marketing, leadership, and strategy.',
    icon: 'briefcase-outline',
    search: 'Business',
  },
  {
    name: 'Design',
    // description: 'UI, UX, and creative skills.',
    icon: 'color-palette-outline',
    search: 'Design',
  },
];

const courses = [
  {
    id: '1',
    title: 'Introduction to Python',
    instructor: 'Dr. Jane Smith',
    image: 'https://via.placeholder.com/150',
    progress: 0.65,
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    instructor: 'Prof. John Doe',
    image: 'https://via.placeholder.com/150',
    progress: 0.3,
    category: 'Technology',
  },
  {
    id: '3',
    title: 'Web Development Bootcamp',
    instructor: 'Alex Johnson',
    image: 'https://via.placeholder.com/150',
    progress: 0.1,
    category: 'Technology',
  },
];

const mockRecentCourses = [
  { id: '4', title: 'UI/UX Design', category: 'Design' },
  { id: '5', title: 'Python Programming', category: 'Technology' },
  { id: '6', title: 'Business Analytics', category: 'Business' },
  { id: '7', title: 'Mobile App Development', category: 'Technology' },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function InterfaceScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [recentCourses] = useState(mockRecentCourses);
  const [search, setSearch] = useState('');
  const avatarAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(avatarAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
    }).start();
  }, []);

  const handleCategorySelect = (category: typeof categories[0]) => {
    router.push({
      pathname: '/explore',
      params: { search: category.search },
    });
  };

  const handleCoursePress = (course: any) => {
    router.push(`/courses/${course.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => router.push('/notifications')}
        >
          <Ionicons name="notifications-outline" size={26} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <Animated.Image
            source={{ uri: user?.profileImage || 'https://i.pravatar.cc/150?img=47' }}
            style={[
              styles.avatar,
              {
                transform: [
                  {
                    scale: avatarAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.7, 1],
                    }),
                  },
                ],
              },
            ]}
          />
          <Text style={styles.greeting}>
            {getGreeting()}
            {user?.name ? `, ${user.name}` : ''} 👋
          </Text>
          <Text style={styles.subtitle}>Start learning today!</Text>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={Colors.light.muted} />
          <TextInput
            placeholder="Search courses, topics, instructors"
            placeholderTextColor={Colors.light.muted}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={[
                  styles.categoryCard,
                  { backgroundColor: Colors.light.category[cat.name as keyof typeof Colors.light.category] },
                ]}
                onPress={() => handleCategorySelect(cat)}
                activeOpacity={0.9}
              >
                <Ionicons name={cat.icon as any} size={26} color={Colors.light.primary} />
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryDesc}>{cat.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Continue Learning */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {courses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => handleCoursePress(course)}
                activeOpacity={0.9}
              >
                <Image source={{ uri: course.image }} style={styles.courseImage} />
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {course.title}
                  </Text>
                  <Text style={styles.courseInstructor}>{course.instructor}</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[styles.progressFill, { width: `${course.progress * 100}%` }]}
                    />
                  </View>
                  <Text style={styles.progressText}>{Math.round(course.progress * 100)}% complete</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recently Viewed */}
        {recentCourses.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recently Viewed</Text>
              <TouchableOpacity onPress={() => router.push('/explore')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              horizontal
              data={recentCourses}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentList}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recentCard}
                  onPress={() => handleCoursePress(item)}
                  activeOpacity={0.9}
                >
                  <Ionicons name="play-circle-outline" size={26} color={Colors.light.primary} />
                  <Text style={styles.recentTitle}>{item.title}</Text>
                  <Text style={styles.recentCategory}>{item.category}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  notificationIcon: {
    padding: 6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.light.card,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    color: Colors.light.primary,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.light.muted,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.light.text,
    flex: 1,
  },
  section: {
    marginTop:15,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '30%',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent:'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    color: Colors.light.primary,
  },
  categoryDesc: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    color: Colors.light.muted,
  },
  courseCard: {
    width: 180,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  courseImage: {
    width: '100%',
    height: 100,
  },
  courseContent: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: Colors.light.muted,
    marginBottom: 6,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.primary,
  },
  progressText: {
    fontSize: 13,
    color: Colors.light.muted,
  },
  recentList: {
    paddingRight: 20,
  },
  recentCard: {
    backgroundColor: '#F2F2F2',
    padding: 14,
    borderRadius: 10,
    marginRight: 14,
    width: 150,
    alignItems: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    color: Colors.light.text,
    textAlign: 'center',
  },
  recentCategory: {
    fontSize: 13,
    color: Colors.light.muted,
    marginTop: 4,
    textAlign: 'center',
  },
});
