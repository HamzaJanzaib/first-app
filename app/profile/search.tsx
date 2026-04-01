import React, { useState, useMemo, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable,
  FlatList, Dimensions
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import TaskCard from '@/components/TaskCard';
import Animated, { FadeInUp, FadeInDown, ZoomIn, SlideInLeft } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import AttractionBackground from '@/components/AttractionBackground';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');

const QUICK_FILTERS = ['All', 'Design', 'Work', 'Health', 'Study'];

export default function SearchTasks() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const { tasks } = useTasks();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const inputRef = useRef<TextInput>(null);

  const filteredTasks = useMemo(() => {
    let result = tasks;

    if (activeFilter !== 'All') {
      result = result.filter(t =>
        t.category.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    return result;
  }, [tasks, searchQuery, activeFilter]);

  const recentTasks = useMemo(() =>
    tasks.slice(0, 3),
    [tasks]
  );

  const showResults = searchQuery.trim().length > 0 || activeFilter !== 'All';

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <Animated.View entering={FadeInDown.springify()} style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Search</Text>
          <Text style={[styles.headerSub, { color: colors.textSecondary }]}>{tasks.length} tasks available</Text>
        </View>
        <View style={{ width: 44 }} />
      </Animated.View>

      {/* Search Bar */}
      <Animated.View entering={FadeInDown.delay(80).springify()} style={styles.searchSection}>
        <Pressable
          style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => inputRef.current?.focus()}
        >
          <Ionicons name="search" size={20} color={searchQuery ? colors.primary : colors.textSecondary} />
          <TextInput
            ref={inputRef}
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Title, category, status…"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => { setSearchQuery(''); Haptics.selectionAsync(); }}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </Pressable>
          )}
        </Pressable>
      </Animated.View>

      {/* Quick Filter Chips */}
      <Animated.View entering={FadeInDown.delay(140).springify()} style={styles.filterRow}>
        {QUICK_FILTERS.map((filter, index) => {
          const isActive = activeFilter === filter;
          return (
            <Pressable
              key={filter}
              style={[
                styles.filterChip,
                {
                  backgroundColor: isActive ? colors.primary : colors.surface,
                  borderColor: isActive ? colors.primary : colors.border,
                }
              ]}
              onPress={() => {
                Haptics.selectionAsync();
                setActiveFilter(filter);
              }}
            >
              <Text style={[styles.filterChipText, { color: isActive ? '#fff' : colors.textSecondary }]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </Animated.View>

      <FlatList
        data={showResults ? filteredTasks : []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          !showResults ? (
            /* Recent Tasks Suggestion */
            <Animated.View entering={FadeInUp.delay(200).springify()}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Recent Tasks</Text>
              {recentTasks.map((task, index) => (
                <Animated.View key={task.id} entering={SlideInLeft.delay(index * 80).springify()}>
                  <Pressable
                    style={[styles.recentItem, { backgroundColor: colors.surface, borderColor: colors.border }]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      router.push(`/task/${task.id}` as any);
                    }}
                  >
                    <View style={[styles.recentIcon, { backgroundColor: task.icon.backgroundColor || colors.primary }]}>
                      <Ionicons name={task.icon.name as any} size={18} color="#fff" />
                    </View>
                    <View style={styles.recentTextBlock}>
                      <Text style={[styles.recentTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                        {task.title}
                      </Text>
                      <Text style={[styles.recentCat, { color: colors.textSecondary }]}>{task.category}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                  </Pressable>
                </Animated.View>
              ))}
            </Animated.View>
          ) : null
        }
        ListEmptyComponent={
          showResults ? (
            <Animated.View entering={ZoomIn.springify()} style={styles.emptyContainer}>
              <View style={[styles.emptyIconCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Nothing found</Text>
              <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                No tasks match "{searchQuery || activeFilter}". Try a different keyword.
              </Text>
            </Animated.View>
          ) : null
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 60).springify()}>
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
  container: { flex: 1 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1,
  },
  headerTitle: { fontSize: 24, fontWeight: '800', textAlign: 'center' },
  headerSub: { fontSize: 12, textAlign: 'center', fontWeight: '500', marginTop: 2 },

  searchSection: { paddingHorizontal: 20, marginBottom: 14 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 58,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  searchInput: { flex: 1, fontSize: 16, fontWeight: '600' },

  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipText: { fontSize: 13, fontWeight: '700' },

  list: {
    paddingHorizontal: 4,
    paddingBottom: 100,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recentIcon: {
    width: 42, height: 42, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  recentTextBlock: { flex: 1 },
  recentTitle: { fontSize: 15, fontWeight: '700', marginBottom: 2 },
  recentCat: { fontSize: 12, fontWeight: '500' },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
    gap: 16,
  },
  emptyIconCircle: {
    width: 100, height: 100, borderRadius: 50,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  emptyTitle: { fontSize: 22, fontWeight: '800' },
  emptySubtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
});
