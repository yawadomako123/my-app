import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type EducationLevel = 'highschool' | 'bachelor' | 'master' | 'phd' | 'other';
type AppPurpose = 'learning' | 'career' | 'skills' | 'exploration';

export default function OnboardingScreen() {
  const router = useRouter();
  const { goal = '0' } = useLocalSearchParams<{ goal?: string }>();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const [education, setEducation] = useState<EducationLevel | null>(null);
  const [occupation, setOccupation] = useState('');
  const [purpose, setPurpose] = useState<AppPurpose | null>(null);
  const [customEducation, setCustomEducation] = useState('');

  const theme = {
    background: isDark ? '#121212' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    card: isDark ? '#1E1E1E' : '#F8F8F8',
    accent: '#0066CC',
    border: isDark ? '#333333' : '#DDDDDD',
  };

  const educationLevels = [
    { id: 'highschool', label: 'High School' },
    { id: 'bachelor', label: "Bachelor's Degree" },
    { id: 'master', label: "Master's Degree" },
    { id: 'phd', label: 'PhD' },
    { id: 'other', label: 'Other' },
  ];

  const purposes = [
    { id: 'learning', label: 'Structured Learning' },
    { id: 'career', label: 'Career Advancement' },
    { id: 'skills', label: 'Skill Development' },
    { id: 'exploration', label: 'Personal Exploration' },
  ];

  const getGoalTitle = () => {
    switch (goal) {
      case '1':
        return 'Starting Your Career';
      case '2':
        return 'Changing Your Career';
      case '3':
        return 'Growing in Your Role';
      case '4':
        return 'Exploring New Topics';
      default:
        return 'Your Goal';
    }
  };

  const handleSubmit = () => {
    const userData = {
      goal,
      education: education === 'other' ? customEducation.trim() : education,
      occupation: occupation.trim(),
      purpose,
    };
    console.log('User onboarding data:', userData);
    router.replace('/home');
  };

  const isFormValid =
    education &&
    (education !== 'other' || customEducation.trim()) &&
    occupation.trim() &&
    purpose;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Text style={[styles.title, { color: theme.text }]}>
            Welcome to the Clone Coursera App!
          </Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            We'll customize your experience for: {getGoalTitle()}
          </Text>

          {/* Education Level Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              What's your highest education level?
            </Text>
            <View style={styles.optionsContainer}>
              {educationLevels.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: education === item.id ? theme.accent : theme.card,
                      borderColor: theme.border,
                      marginRight: (index + 1) % 2 === 0 ? 0 : 12,
                      marginBottom: 12,
                    },
                  ]}
                  onPress={() => setEducation(item.id as EducationLevel)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: education === item.id ? '#FFF' : theme.text },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {education === 'other' && (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.card,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Please specify"
                placeholderTextColor="#888"
                value={customEducation}
                onChangeText={setCustomEducation}
              />
            )}
          </View>

          {/* Occupation Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              What's your current occupation?
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: theme.border,
                },
              ]}
              placeholder="E.g. Student, Software Engineer, etc."
              placeholderTextColor="#888"
              value={occupation}
              onChangeText={setOccupation}
            />
          </View>

          {/* App Purpose Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              What are you primarily using this app for?
            </Text>
            <View style={styles.optionsContainer}>
              {purposes.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: purpose === item.id ? theme.accent : theme.card,
                      borderColor: theme.border,
                      marginRight: (index + 1) % 2 === 0 ? 0 : 12,
                      marginBottom: 12,
                    },
                  ]}
                  onPress={() => setPurpose(item.id as AppPurpose)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      { color: purpose === item.id ? '#FFF' : theme.text },
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              {
                backgroundColor: theme.accent,
                opacity: isFormValid ? 1 : 0.6,
              },
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid}
          >
            <Text style={styles.submitButtonText}>Complete Setup</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    opacity: 0.8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
  },
  input: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
