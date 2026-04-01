import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import TaskCard from '@/components/TaskCard';
import Animated, { FadeInUp } from 'react-native-reanimated';
import AttractionBackground from '@/components/AttractionBackground';
import { useTheme } from '@/context/ThemeContext';

export default function SearchTasks() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
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

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Find Tasks</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.input, { color: colors.textPrimary }]}
          placeholder="Search by title or label..."
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
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
              <Ionicons name="sad-outline" size={48} color={colors.textSecondary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No matches for "{searchQuery}"</Text>
            </View>
          ) : (
            <View style={styles.initialContainer}>
              <Ionicons name="search-outline" size={64} color={colors.border} />
              <Text style={[styles.initialText, { color: colors.textSecondary }]}>Search any task or category</Text>
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
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 24,
    marginTop: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    padding: 24,
    paddingTop: 0,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  initialContainer: {
    alignItems: 'center',
    marginTop: 100,
    gap: 20,
  },
  initialText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
