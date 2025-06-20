import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const notifications = [
  {
    id: '1',
    title: '👋 Welcome to Learnova!',
    description: "Hi! I'm your Learnova Assistant. Ready to start your first course?",
    time: '09:00 AM',
  },
  {
    id: '2',
    title: '📈 Course Progress',
    description: 'Awesome! You have completed 65% of Python. Keep going!',
    time: 'Yesterday',
  },
  {
    id: '3',
    title: '🆕 New Course Available',
    description: 'Check out our new React Native course. Want to explore?',
    time: '2 days ago',
  },
  {
    id: '4',
    title: '🎯 Daily Goal',
    description: "Don't forget to complete your daily lesson!",
    time: '2 days ago',
  },
];

const demoReplies = [
  "I'm here to help! What would you like to learn today?",
  "You can browse new courses in the Explore tab.",
  "Keep up the great work!",
  "Let me know if you have any questions about your courses.",
];

export default function NotificationsScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(notifications);
  const [typing, setTyping] = useState(false);

  // Simulate AI reply
  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        id: (messages.length + 1).toString(),
        title: 'You',
        description: input,
        time: 'Now',
        user: true,
      },
    ]);
    setInput('');
    setTyping(true);

    // Simulate AI typing and reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          title: 'Learnova Assistant',
          description: demoReplies[Math.floor(Math.random() * demoReplies.length)],
          time: 'Now',
        },
      ]);
      setTyping(false);
    }, 1200);
  };

  return (
    <LinearGradient
      colors={['#e0e7ff', '#fff']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.container}>
          {/* Assistant Header */}
          <View style={styles.assistantHeader}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Coursera_logo.png' }}
              style={styles.assistantAvatar}
            />
            <View>
              <Text style={styles.assistantName}>Learnova Assistant</Text>
              <Text style={styles.assistantStatus}>Online</Text>
            </View>
          </View>
          {/* Chat Messages */}
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <View style={[
                styles.messageRow,
                item.user ? styles.userRow : styles.assistantRow
              ]}>
                <Image
                  source={{
                    uri: item.user
                      ? 'https://randomuser.me/api/portraits/men/32.jpg'
                      : 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Coursera_logo.png',
                  }}
                  style={styles.avatar}
                />
                <View style={styles.messageContentNoBubble}>
                  <Text style={[
                    styles.messageTitle,
                    item.user && styles.userTitle
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.messageText}>{item.description}</Text>
                  <View style={styles.messageFooter}>
                    <Ionicons name="time-outline" size={14} color="#888" style={{ marginRight: 4 }} />
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>
              </View>
            )}
            ListFooterComponent={
              typing ? (
                <View style={[styles.messageRow, styles.assistantRow]}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Coursera_logo.png',
                    }}
                    style={styles.avatar}
                  />
                  <View style={styles.messageContentNoBubble}>
                    <Text style={styles.messageTitle}>Learnova Assistant</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                      <ActivityIndicator size="small" color="#0056D2" />
                      <Text style={{ marginLeft: 8, color: '#888' }}>Typing...</Text>
                    </View>
                  </View>
                </View>
              ) : null
            }
            ListEmptyComponent={
              <Text style={styles.empty}>No notifications yet.</Text>
            }
          />
          {/* User Input */}
          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Ask Learnova Assistant..."
              value={input}
              onChangeText={setInput}
              placeholderTextColor="#888"
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Ionicons name="send" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingTop: 0 },
  assistantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 12,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
    marginBottom: 4,
  },
  assistantAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  assistantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0056D2',
    letterSpacing: 0.2,
  },
  assistantStatus: {
    fontSize: 13,
    color: '#4ade80',
    fontWeight: '600',
    marginTop: 2,
  },
  list: {
    padding: 16,
    paddingBottom: 80,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  assistantRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  messageContentNoBubble: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    paddingVertical: 2,
    paddingHorizontal: 0,
    maxWidth: '80%',
    shadowColor: 'transparent',
    elevation: 0,
  },
  messageTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#0056D2',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  userTitle: {
    color: '#6366F1',
  },
  messageText: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    lineHeight: 21,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    marginRight: 10,
    color: '#222',
  },
  sendButton: {
    backgroundColor: '#0056D2',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});