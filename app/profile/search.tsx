import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import TaskCard from '@/components/TaskCard';
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function SearchTasks() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { tasks } = useTasks();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(query) || 
      t.category.toLowerCase().includes(query)
    );
  }, [tasks, searchQuery]);

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search your tasks..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          searchQuery.trim() ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="sad-outline" size={48} color={Colors.textSecondary} />
              <Text style={styles.emptyText}>No tasks found matching "{searchQuery}"</Text>
            </View>
          ) : (
            <View style={styles.initialContainer}>
              <Ionicons name="search-outline" size={64} color={Colors.border} />
              <Text style={styles.initialText}>Search by title or category</Text>
            </View>
          )
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 50).springify()}>
            <Pressable onPress={() => router.push(`/task/${item.id}` as any)}>
              <TaskCard task={item} />
            </Pressable>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 16,
  },
  list: {
    padding: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    gap: 16,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
  initialContainer: {
    alignItems: 'center',
    marginTop: 100,
    gap: 20,
  },
  initialText: {
    color: Colors.textSecondary,
    fontSize: 18,
    fontWeight: '500',
  },
});
