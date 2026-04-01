import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import Animated, { FadeInUp, SlideInRight, Layout } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import AttractionBackground from '@/components/AttractionBackground';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48 - 16) / 2;

export default function CategoryBrowser() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, theme } = useTheme();
  const { tasks, categories: contextCategories } = useTasks();

  const CATEGORY_STYLES: Record<string, { icon: string; color: string; bg: string }> = {
    'Design': { icon: 'color-palette', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
    'Grocery shopping': { icon: 'cart', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' },
    'Home Responsibilities': { icon: 'home', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
    'Personal Study': { icon: 'book', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)' },
    'Health & Fitness': { icon: 'heart', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
    'Work Projects': { icon: 'briefcase', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    'Development': { icon: 'code-slash', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
  };

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    tasks.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return contextCategories.map(cat => ({
      name: cat.name,
      count: counts[cat.name] || 0,
      icon: cat.icon,
      color: cat.color,
      bg: cat.color + '1A',
    })).sort((a, b) => b.count - a.count);
  }, [tasks, contextCategories]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable 
          onPress={() => router.back()} 
          style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Categories</Text>
        <Pressable 
           style={[styles.addBtn, { backgroundColor: colors.primary }]}
           onPress={() => {
             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
             router.push('/profile/add-category' as any);
           }}
        >
            <Ionicons name="add" size={24} color="#fff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(100).springify()}>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Streamline your productivity by organizing tasks into focused domains.
            </Text>
        </Animated.View>
        
        <View style={styles.grid}>
          {categories.map((cat, index) => (
            <Animated.View 
              key={cat.name} 
              layout={Layout.springify()}
              entering={SlideInRight.delay(index * 120).springify()}
              style={[styles.categoryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Pressable 
                style={styles.cardPressable}
                onPress={() => {
                   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                   // Navigate to a filtered search or category-specific view
                }}
              >
                <View style={[styles.iconContainer, { backgroundColor: cat.bg }]}>
                  <Ionicons name={cat.icon as any} size={28} color={cat.color} />
                  <View style={[styles.iconGlow, { backgroundColor: cat.color }]} />
                </View>
                <Text style={[styles.categoryName, { color: colors.textPrimary }]} numberOfLines={2}>
                    {cat.name}
                </Text>
                <View style={styles.countBadge}>
                    <Text style={[styles.taskCount, { color: colors.textSecondary }]}>{cat.count} Tasks</Text>
                    <Ionicons name="chevron-forward" size={12} color={colors.textSecondary} />
                </View>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {categories.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons name="layers-outline" size={80} color={colors.border} />
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No active categories found.</Text>
            <Pressable style={[styles.createBtn, { borderColor: colors.primary }]}>
                <Text style={{ color: colors.primary, fontWeight: '700' }}>Create First Category</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  content: {
    padding: 24,
    paddingTop: 0,
    paddingBottom: 100,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 32,
    lineHeight: 22,
    maxWidth: '90%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: COLUMN_WIDTH,
    borderRadius: 28,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  cardPressable: {
    padding: 20,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  iconGlow: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    width: 40,
    height: 40,
    borderRadius: 20,
    opacity: 0.15,
  },
  categoryName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
    height: 48,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  taskCount: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
    gap: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
  },
  createBtn: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 10,
  },
});
