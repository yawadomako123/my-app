import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CareerOrCourse, getRecentSearches, saveRecentSearch, searchAll } from './services/dataService';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CareerOrCourse[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load recent searches on mount
    const loadRecent = async () => {
      const recent = await getRecentSearches();
      setRecentSearches(recent);
    };
    loadRecent();
  }, []);

  // Debounced search handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const handler = setTimeout(() => {
      const results = searchAll(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      saveRecentSearch(query);
      // Also update local recent searches immediately for UX
      setRecentSearches((prev) => {
        const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
        return [query, ...filtered].slice(0, 5);
      });
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRecentPress = (query: string) => {
    setSearchQuery(query);
  };

  const handleRemoveRecent = (query: string) => {
    const updated = recentSearches.filter(item => item !== query);
    setRecentSearches(updated);
    // Remove from AsyncStorage as well
    (async () => {
      try {
        await saveRecentSearch(''); // Hack: can't remove specific, so override with updated list below
        await AsyncStorage.setItem('recentSearches', JSON.stringify(updated));
      } catch {}
    })();
  };

  const renderResultItem = ({ item }: { item: CareerOrCourse }) => {
    // Navigate differently based on type
    const routeBase = item.type === 'career' ? '/career/' : '/course/';
    const routeId = item.id.replace(`${item.type}-`, '');

    return (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => router.push(`${routeBase}${routeId}`)}
      >
        <View style={styles.resultContent}>
          <View style={[styles.iconContainer, { backgroundColor: '#e3f2fd' }]}>
            <MaterialCommunityIcons
              name={item.icon || 'briefcase'}
              size={24}
              color="#1976d2"
            />
          </View>
          <View style={styles.resultTextContainer}>
            <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.resultCategory} numberOfLines={1}>{item.category}</Text>
            {item.likes && item.likes.length > 0 && (
              <View style={styles.likesContainer}>
                {item.likes.slice(0, 2).map((like, index) => (
                  <View key={index} style={styles.likeTag}>
                    <Text style={styles.likeText}>{like}</Text>
                  </View>
                ))}
                {item.likes.length > 2 && (
                  <Text style={styles.moreLikes}>+{item.likes.length - 2} more</Text>
                )}
              </View>
            )}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
      </TouchableOpacity>
    );
  };

  const renderRecentItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleRecentPress(item)}
    >
      <Ionicons name="time-outline" size={18} color="#666" />
      <Text style={styles.recentSearchText} numberOfLines={1}>{item}</Text>
      <TouchableOpacity
        style={styles.clearRecentSearch}
        onPress={(e) => {
          e.stopPropagation();
          handleRemoveRecent(item);
        }}
      >
        <Ionicons name="close" size={18} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search careers and courses..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearchChange}
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            returnKeyType="search"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1976d2" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : searchQuery === '' ? (
        <View style={styles.recentSearchesContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {recentSearches.length > 0 ? (
            <FlatList
              data={recentSearches}
              renderItem={renderRecentItem}
              keyExtractor={(item, index) => `recent-${index}`}
              style={styles.recentSearchesList}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={50} color="#ccc" />
              <Text style={styles.emptyStateText}>Your recent searches will appear here</Text>
            </View>
          )}
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderResultItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsListContent}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="alert-circle-outline" size={50} color="#ccc" />
          <Text style={styles.emptyStateText}>No results found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
    marginRight: -8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  recentSearchesContainer: {
    flex: 1,
    padding: 16,
  },
  recentSearchesList: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  recentSearchText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  clearRecentSearch: {
    padding: 4,
    marginLeft: 8,
  },
  resultsListContent: {
    padding: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  resultContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resultTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  resultCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  likesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  likeTag: {
    backgroundColor: '#f0f7ff',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  likeText: {
    fontSize: 12,
    color: '#1976d2',
  },
  moreLikes: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
    alignSelf: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
    textAlign: 'center',
  },
});
