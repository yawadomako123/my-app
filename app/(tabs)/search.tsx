// app/search.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/constants/Colors';
import { allCourses, Course } from './explore';

const popularSearches = [
  'UX Design', 'Startup Jobs',
  'Cyber Security', 'Web Development', 'Data Analysis',
  'Game Development', 'Mobile App Development',
  'Cloud Computing', 'Product Management',
];

const Search = () => {
  const { isDarkMode } = useTheme();
  const Colors = getThemeColors(isDarkMode);

  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  const filterCourses = (text: string) => {
    const filtered = allCourses.filter(course =>
      course.title.toLowerCase().includes(text.toLowerCase()) ||
      course.category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter(item => item !== trimmed)];
    setRecentSearches(updated.slice(0, 5));
    filterCourses(trimmed);
    setQuery('');
  };

  const clearRecent = () => setRecentSearches([]);

  const removeRecentItem = (item: string) =>
    setRecentSearches(recentSearches.filter(i => i !== item));

  const renderRecentItem = (text: string) => (
    <View key={text} style={[styles.recentItem, { borderColor: Colors.surface }]}>
      <TouchableOpacity
        onPress={() => {
          setQuery(text);
          filterCourses(text);
        }}
        style={styles.recentItemTextWrapper}
        activeOpacity={0.7}
      >
        <Ionicons name="time-outline" size={20} color={Colors.muted} style={{ marginRight: 12 }} />
        <Text style={[styles.recentItemText, { color: Colors.text }]}>{text}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removeRecentItem(text)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.closeIconWrapper}
      >
        <Ionicons name="close-circle" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderPopularItem = (text: string) => (
    <TouchableOpacity
      key={text}
      onPress={() => {
        setQuery(text);
        filterCourses(text);
      }}
      style={[styles.topicBadge, { backgroundColor: Colors.primarySoft }]}
      activeOpacity={0.8}
    >
      <Ionicons name="book-outline" size={16} color={Colors.primary} style={{ marginRight: 6 }} />
      <Text style={[styles.topicText, { color: Colors.primary }]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.wrapper, { backgroundColor: Colors.background }]}>
      <View style={styles.searchBarWrapper}>
        <TextInput
          placeholder="What do you want to learn?"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            filterCourses(text);
          }}
          onSubmitEditing={handleSearch}
          style={[styles.input, { backgroundColor: Colors.surface, color: Colors.text }]}
          placeholderTextColor={Colors.muted}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {query.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: Colors.text }]}>Search Results</Text>
            {filteredCourses.length === 0 ? (
              <Text style={{ color: Colors.muted, marginTop: 10 }}>No courses found.</Text>
            ) : (
              filteredCourses.map(course => (
                <View key={course.id} style={[styles.resultItem, { borderColor: Colors.surface }]}>
                  <Text style={[styles.resultTitle, { color: Colors.text }]}>{course.title}</Text>
                  <Text style={[styles.resultCategory, { color: Colors.muted }]}>{course.category}</Text>
                </View>
              ))
            )}
          </View>
        )}

        {recentSearches.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: Colors.text }]}>Recent Searches</Text>
              <TouchableOpacity onPress={clearRecent} activeOpacity={0.7}>
                <Text style={[styles.clearButton, { color: Colors.primary }]}>Clear All</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.recentList, { backgroundColor: Colors.surface }]}>
              {recentSearches.map(renderRecentItem)}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.text }]}>Popular Topics</Text>
          </View>
          <View style={styles.topicsContainer}>{popularSearches.map(renderPopularItem)}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
  },
  searchBarWrapper: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 18,
    fontSize: 17,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '600',
  },
  recentList: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  recentItemTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  recentItemText: {
    fontSize: 16,
  },
  closeIconWrapper: {
    paddingLeft: 16,
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  topicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  topicText: {
    fontSize: 15,
    fontWeight: '600',
  },
  resultItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultCategory: {
    fontSize: 14,
  },
});
