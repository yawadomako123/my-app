// colors.ts

const tintColorLight = '#0a7ea4';
const tintColorDark = '#ffffff';

export type Category = 'Technology' | 'Business' | 'Design' | 'Development' | 'Science' | 'Art' | 'Marketing' | 'Finance';

export const Colors = {
  light: {
    primary: '#3366FF',
    primarySoft: '#E6F0FF',
    text: '#1c1c1e',
    background: '#F9FAFB',
    muted: '#6B7280',
    surface: '#F8FAFC',

    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    border: '#E5E7EB',
    card: '#FFFFFF',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    modalOverlay: 'rgba(0, 0, 0, 0.4)',

    // Category Backgrounds
    categoryBg: {
      Technology: '#B3DBFF',  // Light Blue
      Business: '#FFD8A8',    // Light Orange
      Design: '#E3C6FF',      // Light Purple
      Development: '#B3DBFF',
      Science: '#C7F5D1',
      Art: '#F5C5D1',
      Marketing: '#FFE5B3',
      Finance: '#D1C7F5',
    } as Record<Category, string>,
  },

  dark: {
        primary: '#3F7CFF',
    primarySoft: '#274D96',
    text: '#F5F7FA',
    background: '#151718',
    muted: '#fff',
    surface: '#1C1E21',

    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    border: '#2C2E31',
    card: '#1F2123',
    cardShadow: 'rgba(0, 0, 0, 0.3)',
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
    info: '#60A5FA',
    modalOverlay: 'rgba(0, 0, 0, 0.5)',

    // Category Backgrounds (dark variants)
    categoryBg: {
      Technology: '#A5CFFF',  // Light Teal
      Business: '#FFD6A5',    // Rose Beige
      Design: '#CBAACB',      // Dusty Pink
      Development: '#A5CFFF',
      Science: '#B3E5B3',
      Art: '#E5B3C5',
      Marketing: '#FFE0B3',
      Finance: '#C5B3E5',
    } as Record<Category, string>,
  },
};

export type ThemeColors = typeof Colors.light;

/**
 * Utility to get theme-specific color palette
 * @param darkMode Whether the theme is dark
 * @returns theme color set
 */
export const getThemeColors = (darkMode: boolean): ThemeColors =>
  darkMode ? Colors.dark : Colors.light;
