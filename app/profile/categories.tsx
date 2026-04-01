import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import Animated, { FadeInRight } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function CategoryBrowser() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { tasks } = useTasks();

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    tasks.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      icon: 'folder', // Default icon
      color: Colors.primary, // Default color
    })).sort((a, b) => b.count - a.count);
  }, [tasks]);

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
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.subtitle}>Organize your workflow by category</Text>
        
        <View style={styles.grid}>
          {categories.map((cat, index) => (
            <Animated.View 
              key={cat.name} 
              entering={FadeInRight.delay(index * 100).springify()}
              style={styles.categoryCard}
            >
              <Pressable 
                style={styles.cardPressable}
                onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
              >
                <View style={[styles.iconContainer, { backgroundColor: Colors.primaryMuted }]}>
                  <Ionicons name="grid" size={24} color={Colors.primary} />
                </View>
                <Text style={styles.categoryName} numberOfLines={1}>{cat.name}</Text>
                <Text style={styles.taskCount}>{cat.count} Tasks</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {categories.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No categories found yet.</Text>
          </View>
        )}
      </ScrollView>
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
  content: {
    padding: 24,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  cardPressable: {
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  taskCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
  },
});
