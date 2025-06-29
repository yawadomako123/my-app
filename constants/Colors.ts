const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    primary: '#3366FF',
    primarySoft: '#E6F0FF',
    text: '#1c1c1e',
    background: '#F9FAFB',
    muted: '#6B7280',
    surface: '#f2f2f2',

    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    // ➕ Additional
    border: '#E5E7EB',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    error: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    info: '#3B82F6',
    modalOverlay: 'rgba(0, 0, 0, 0.4)',
  },

  dark: {
    primary: '#3366FF',
    primarySoft: '#253A6A',
    text: '#ECEDEE',
    background: '#151718',
    muted: '#9BA1A6',
    surface: '#1F1F1F',

    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    // ➕ Additional
    border: '#2C2E31',
    cardShadow: 'rgba(0, 0, 0, 0.3)',
    error: '#F87171',
    success: '#34D399',
    warning: '#FBBF24',
    info: '#60A5FA',
    modalOverlay: 'rgba(0, 0, 0, 0.5)',
  },
};

export const getThemeColors = (darkMode: boolean) =>
  darkMode ? Colors.dark : Colors.light;
