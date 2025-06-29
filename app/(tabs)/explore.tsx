// app/explore.tsx
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/constants/Colors';

export type Course = {
  id: string;
  title: string;
  category: string;
};

const categoryStyles: Record<string, { color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  Design: { color: '#E3C6FF', icon: 'color-palette-outline' },
  Development: { color: '#B3DBFF', icon: 'code-slash-outline' },
  Business: { color: '#FFD8A8', icon: 'briefcase-outline' },
  Data: { color: '#A2EFD1', icon: 'bar-chart-outline' },
};

export const allCourses: Course[] = [
  { id: '1', title: 'UI/UX Design', category: 'Design' },
  { id: '2', title: 'Web Development', category: 'Development' },
  { id: '3', title: 'Marketing', category: 'Business' },
  { id: '4', title: 'Data Science', category: 'Data' },
  { id: '5', title: 'Mobile App Development', category: 'Development' },
  { id: '6', title: 'Graphic Design', category: 'Design' },
  { id: '7', title: 'Digital Marketing', category: 'Business' },
  { id: '8', title: 'Machine Learning', category: 'Data' },
  { id: '9', title: 'Python Programming', category: 'Development' },
  { id: '10', title: 'JavaScript', category: 'Development' },
  { id: '11', title: 'Business Analytics', category: 'Business' },
  { id: '12', title: 'Product Management', category: 'Business' },
  { id: '13', title: 'Cybersecurity', category: 'Development' },
  { id: '14', title: 'Cloud Computing', category: 'Development' },
  { id: '15', title: 'Digital Illustration', category: 'Design' },
  { id: '16', title: 'Public Adminstration', category: 'Business' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(allCourses);

  const { isDarkMode } = useTheme();
  const Colors = getThemeColors(isDarkMode);

  useEffect(() => {
    if (params.search) {
      const keyword = params.search.toString();
      setSearchQuery(keyword);
      filterCourses(keyword);
    }
  }, [params]);

  const filterCourses = (text: string) => {
    const filtered = allCourses.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase()) ||
      course.category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    filterCourses(text);
  };

  const handleCoursePress = (course: Course) => {
    router.push({
      pathname: '/courses',
      params: { course: course.title },
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors.background }]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.header, { color: Colors.primary }]}>🎓 Explore Courses</Text>

          <View style={[styles.searchContainer, { backgroundColor: Colors.surface }]}>
            <Ionicons name="search-outline" size={20} color={Colors.muted} />
            <TextInput
              placeholder="Search by title or category"
              placeholderTextColor={Colors.muted}
              style={[styles.searchInput, { color: Colors.text }]}
              value={searchQuery}
              onChangeText={handleSearch}
              returnKeyType="search"
            />
          </View>

          {filteredCourses.length === 0 ? (
            <Text style={[styles.emptyMessage, { color: Colors.muted }]}>No courses found.</Text>
          ) : (
            <FlatList
              data={filteredCourses}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.courseList}
              columnWrapperStyle={styles.courseRow}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                const { color, icon } = categoryStyles[item.category] || {
                  color: Colors.surface,
                  icon: 'school-outline',
                };
                return (
                  <TouchableOpacity
                    style={[styles.courseCard, { backgroundColor: color }]}
                    onPress={() => handleCoursePress(item)}
                  >
                    <View style={styles.iconWrapper}>
                      <Ionicons name={icon} size={30} color={Colors.text} />
                    </View>
                    <Text style={[styles.courseTitle, { color: Colors.text }]}>{item.title}</Text>
                    <Text style={[styles.courseCategory, { color: Colors.muted }]}>{item.category}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },
  courseList: {
    paddingBottom: 100,
  },
  courseRow: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  courseCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    alignItems: 'center',
  },
  iconWrapper: {
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 60,
    height: 60,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5,
  },
  courseCategory: {
    fontSize: 13,
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 30,
  },
});
