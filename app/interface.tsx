import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Course = {
  id: string;
  title: string;
  category: string;
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

const mockRecentCourses: Course[] = [
  { id: '1', title: 'UI/UX Design', category: 'Design' },
  { id: '2', title: 'Python Programming', category: 'Development' },
];

const tabs = [
  { name: 'Explore', icon: 'compass-outline', route: '/explore' },
  { name: 'Career', icon: 'rocket-outline', route: '/career' },
  { name: 'Learn', icon: 'book-outline', route: '/learn' },
  { name: 'Search', icon: 'search-outline', route: '/search' },
  { name: 'Profile', icon: 'person-outline', route: '/profile' },
];

export default function InterfaceScreen() {
  const { name, email } = useLocalSearchParams<{ name?: string; email?: string }>();
  const router = useRouter();
  const [recentCourses, setRecentCourses] = useState<Course[]>([]);

  useEffect(() => {
    setRecentCourses(mockRecentCourses);
  }, []);

  const handleCategorySelect = (category: typeof categories[0]) => {
    router.push({
      pathname: '/explore',
      params: { search: category.search },
    });
  };

  const handleCoursePress = (course: Course) => {
    router.push({
      pathname: '/courses',
      params: { course: course.title },
    });
  };

  const handleTabPress = (route: string) => {
    if (route === '/profile') {
      router.push({
        pathname: route,
        params: { name: name || 'User', email: email || '' },
      });
    } else {
      router.push(route);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>
          {name ? `Welcome, ${name}!` : 'Welcome!'}
        </Text>
        <Text style={styles.subtitle}>What do you want to learn today?</Text>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore by Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.name}
                style={[styles.categoryCard, { backgroundColor: cat.color }]}
                onPress={() => handleCategorySelect(cat)}
              >
                <Ionicons name={cat.icon} size={30} color="#333" />
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Text style={styles.categoryDesc}>{cat.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recently Viewed Section */}
        {recentCourses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recently Viewed</Text>
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

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={() => handleTabPress(tab.route)}
          >
            <Ionicons name={tab.icon} size={24} color={Colors.light.text} />
            <Text style={styles.navText}>{tab.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 6,
    marginBottom: 20,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 12,
  },
  categoryContainer: {
    gap: 16,
  },
  categoryCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
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
  recentList: {
    flexDirection: 'row',
    gap: 12,
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.light.background,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: Colors.light.text,
    marginTop: 4,
  },
});
