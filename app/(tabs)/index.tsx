import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Colors = {
  light: {
    background: '#fff',
    text: '#1c1c1e',
    primary: '#0056D2',
    border: '#e0e0e0',
  },
};

const categories = [
  {
    name: 'Technology',
    description: 'Code, build, and master the future.',
    icon: 'code-slash-outline',
    search: 'Development',
    color: '#D0EBFF',
  },
  {
    name: 'Business',
    description: 'Marketing, leadership, and strategy.',
    icon: 'briefcase-outline',
    search: 'Business',
    color: '#FFE6CC',
  },
  {
    name: 'Design',
    description: 'UI, UX, and creative skills.',
    icon: 'color-palette-outline',
    search: 'Design',
    color: '#EEDFFF',
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
];

export default function InterfaceScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [recentCourses, setRecentCourses] = useState(mockRecentCourses);

  const handleCategorySelect = (category: typeof categories[0]) => {
    router.push({
      pathname: '/explore',
      params: { search: category.search },
    });
  };

  const handleCoursePress = (course: any) => {
    router.push(`/courses/${course.id}`);
  };
  const [profileImage, setProfileImage] = useState<string | null>('https://i.pravatar.cc/150?img=47');
  const [isEditing, setIsEditing] = useState(false);


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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
            <View>
              <Text style={styles.title}>Welcome{user?.name ? `, ${user.name}` : ' to Coursera'}</Text>
          {user?.name && <Text style={styles.subtitle}>Start learning today!</Text>}
            </View>
       
          <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
            <Image source={{ uri: profileImage! }} style={styles.avatar} />
            {isEditing && (
              <View style={[styles.cameraIconWrapper, { backgroundColor: theme.primary }]}>
                <Ionicons name="camera" size={18} color="#fff" />
              </View>
            )}
            
    </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>What do you want to learn today?</Text>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.categoryTitle}>
            <Text style={styles.sectionTitle}>Explore by Category</Text>
            <TouchableOpacity onPress={() => router.push('/explore')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={[styles.categoryCard, { backgroundColor: cat.color }]}
                onPress={() => handleCategorySelect(cat)}
              >
                <Ionicons name={cat.icon as any} size={30} color="#333" />
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
              >
                <Image source={{ uri: course.image }} style={styles.courseImage} />
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {course.title}
                  </Text>
                  <Text style={styles.courseInstructor}>{course.instructor}</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${course.progress * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {Math.round(course.progress * 100)}% complete
                  </Text>
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
              contentContainerStyle={styles.recentList}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recentCard}
                  onPress={() => handleCoursePress(item)}
                >
                  <Ionicons name="play-circle-outline" size={26} color="#444" />
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
    paddingTop: 50,
    backgroundColor: Colors.light.background,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 55,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  scroll: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  categoryContainer: {},
  categoryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  categoryTitle:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: '10',
    paddingTop: '10'
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    color: '#333',
  },
  categoryDesc: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  courseCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: 100,
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  recentList: {
    paddingRight: 20,
  },
  recentCard: {
    backgroundColor: '#F2F2F2',
    padding: 16,
    borderRadius: 10,
    marginRight: 12,
    width: 180,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
    color: '#333',
  },
  recentCategory: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
});
