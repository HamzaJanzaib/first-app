import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import AttractionBackground from '@/components/AttractionBackground';

const { width } = Dimensions.get('window');

export default function ProductivityStats() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const todoTasks = tasks.filter(t => t.status === 'Todo').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Weekly Progress */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.summaryCard}>
          <View style={styles.circleContainer}>
            <View style={[styles.circle, { borderColor: Colors.primary }]}>
              <Text style={styles.percentText}>{completionRate}%</Text>
              <Text style={styles.percentLabel}>Done</Text>
            </View>
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryTitle}>Productivity</Text>
            <Text style={styles.summarySubtitle}>Completed {completedTasks} tasks this week.</Text>
          </View>
        </Animated.View>

        {/* Task Breakdown Grid */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <Animated.View entering={FadeInRight.delay(200).springify()} style={[styles.statBox, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="checkmark-circle" size={24} color="#15803d" />
            <Text style={styles.statCount}>{completedTasks}</Text>
            <Text style={[styles.statLabel, { color: '#15803d' }]}>Fixed</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(300).springify()} style={[styles.statBox, { backgroundColor: '#FFFBEB' }]}>
            <Ionicons name="flash" size={24} color="#b45309" />
            <Text style={styles.statCount}>{inProgressTasks}</Text>
            <Text style={[styles.statLabel, { color: '#b45309' }]}>Ongoing</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(400).springify()} style={[styles.statBox, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="calendar" size={24} color="#1d4ed8" />
            <Text style={styles.statCount}>{todoTasks}</Text>
            <Text style={[styles.statLabel, { color: '#1d4ed8' }]}>Backlog</Text>
          </Animated.View>
        </View>

        {/* Progress Detailed Breakdown */}
        <Text style={styles.sectionTitle}>Completion Progress</Text>
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.chartCard}>
          {/* Efficiency Bar */}
          <View style={styles.chartLine}>
            <View style={styles.chartLabelRow}>
              <Text style={styles.chartLabel}>Efficiency</Text>
              <Text style={styles.chartValue}>{completionRate}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${completionRate}%`, backgroundColor: Colors.primary }]} />
            </View>
          </View>

          {/* Workload Bar */}
          <View style={styles.chartLine}>
            <View style={styles.chartLabelRow}>
              <Text style={styles.chartLabel}>Total Tasks</Text>
              <Text style={styles.chartValue}>{totalTasks}</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '100%', backgroundColor: Colors.border }]} />
            </View>
          </View>
        </Animated.View>

        {/* Categories Shortcut */}
        <Pressable 
          style={styles.categoriesShortcut} 
          onPress={() => router.push('/profile/categories' as any)}
        >
          <View style={styles.folderIconBg}>
            <Ionicons name="folder-open" size={20} color="#fff" />
          </View>
          <Text style={styles.categoriesShortcutText}>View by Categories</Text>
          <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
        </Pressable>
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
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  content: {
    padding: 24,
    paddingTop: 0,
    paddingBottom: 120, // Tab bar space
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  circleContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  percentLabel: {
    fontSize: 8,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statBox: {
    width: (width - 48 - 24) / 3,
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  statCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: 12,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  chartCard: {
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chartLine: {
    marginBottom: 20,
  },
  chartLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  chartLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chartValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: Colors.background,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  categoriesShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 24,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  folderIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesShortcutText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
