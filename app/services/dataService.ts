// services/dataService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CareerOrCourse = {
  id: string;
  type: 'career' | 'course';
  title: string;
  description?: string;
  category: string;
  likes?: string[];
  icon?: string;
};

// Sample careers and courses data
const careers = [
  {
    title: 'Doctor',
    description: 'Medical professional who diagnoses and treats illnesses.',
    category: 'Healthcare',
    likes: ['medicine', 'helping people'],
    icon: 'stethoscope',
  },
  {
    title: 'Teacher',
    description: 'Educates students in various subjects.',
    category: 'Education',
    likes: ['teaching', 'learning'],
    icon: 'book-open',
  },
  // Add more careers here...
];

const courses = [
  {
    title: 'Introduction to Graphic Design',
    description: 'Learn the basics of graphic design.',
    category: 'Art & Design',
    likes: ['creativity', 'design'],
    icon: 'palette',
  },
  {
    title: 'Financial Accounting',
    description: 'Basics of accounting and finance.',
    category: 'Finance',
    likes: ['numbers', 'budgeting'],
    icon: 'finance',
  },
  // Add more courses here...
];

// Helper to generate safe IDs
const generateId = (prefix: string, title: string) =>
  `${prefix}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;

// Get all items combined with consistent structure
export const getAllItems = (): CareerOrCourse[] => {
  const careerItems = careers.map(item => ({
    ...item,
    id: generateId('career', item.title),
    type: 'career' as const,
  }));

  const courseItems = courses.map(item => ({
    ...item,
    id: generateId('course', item.title),
    type: 'course' as const,
  }));

  return [...careerItems, ...courseItems];
};

// Search careers and courses by query
export const searchAll = (query: string): CareerOrCourse[] => {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  return getAllItems().filter(item =>
    item.title.toLowerCase().includes(q) ||
    (item.description?.toLowerCase().includes(q) ?? false) ||
    item.category.toLowerCase().includes(q) ||
    (item.likes?.some(like => like.toLowerCase().includes(q)) ?? false)
  );
};

// AsyncStorage key for recent searches
const RECENT_SEARCHES_KEY = 'recentSearches';

// Get recent searches from AsyncStorage
export const getRecentSearches = async (): Promise<string[]> => {
  try {
    const saved = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn('Failed to get recent searches:', e);
    return [];
  }
};

// Save a recent search query, keep max 5 unique entries
export const saveRecentSearch = async (query: string) => {
  try {
    if (!query.trim()) return;

    const recent = await getRecentSearches();
    const filtered = recent.filter(item => item.toLowerCase() !== query.toLowerCase());
    const updated = [query, ...filtered].slice(0, 5);
    await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save recent search:', e);
  }
};
