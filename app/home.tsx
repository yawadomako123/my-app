import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Category = {
  name: string;
};

const categories: Category[] = [
  { name: 'Computer Science' },
  { name: 'Data Science' },
  { name: 'Art and Design' },
  { name: 'Public Administration'},
];

export default function HomeScreen() {
  const router = useRouter();

  const handleCategorySelect = (category: Category) => {
    router.push({
      pathname: '/(tabs)/courses',
      params: { category: category.name },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Coursera Clone</Text>
        <Text style={styles.subtitle}>
          Learn new skills and advance your career with our courses and
          certifications.
        </Text>
      </View>

      <View style={styles.categories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={styles.category}
            onPress={() => handleCategorySelect(category)}
          >
            <View style={styles.categoryCard}>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  category: {
    width: '33.33%',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryCard: {
    width: '100%',
    height: 120,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
