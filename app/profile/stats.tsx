import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

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
        <Text style={styles.headerTitle}>Productivity</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Weekly Header Summary */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.summaryCard}>
          <View style={styles.circleContainer}>
            <View style={[styles.circle, { borderColor: Colors.primary }]}>
              <Text style={styles.percentText}>{completionRate}%</Text>
              <Text style={styles.percentLabel}>Done</Text>
            </View>
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={styles.summaryTitle}>Weekly Progress</Text>
            <Text style={styles.summarySubtitle}>You completed {completedTasks} tasks this week. Keep it up!</Text>
          </View>
        </Animated.View>

        {/* Breakdown Section */}
        <Text style={styles.sectionTitle}>Task Breakdown</Text>
        <View style={styles.statsGrid}>
          <Animated.View entering={FadeInRight.delay(200).springify()} style={[styles.statBox, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="checkmark-circle" size={24} color="#15803d" />
            <Text style={styles.statCount}>{completedTasks}</Text>
            <Text style={[styles.statLabel, { color: '#15803d' }]}>Completed</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(300).springify()} style={[styles.statBox, { backgroundColor: '#FFFBEB' }]}>
            <Ionicons name="flash" size={24} color="#b45309" />
            <Text style={styles.statCount}>{inProgressTasks}</Text>
            <Text style={[styles.statLabel, { color: '#b45309' }]}>In Progress</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(400).springify()} style={[styles.statBox, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="list" size={24} color="#1d4ed8" />
            <Text style={styles.statCount}>{todoTasks}</Text>
            <Text style={[styles.statLabel, { color: '#1d4ed8' }]}>To Do</Text>
          </Animated.View>
        </View>

        {/* Completion Analysis */}
        <Text style={styles.sectionTitle}>Completion Analysis</Text>
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.chartCard}>
          <View style={styles.chartLine}>
            <View style={styles.chartLabelRow}>
              <Text style={styles.chartLabel}>Efficiency</Text>
              <Text style={styles.chartValue}>{completionRate}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${completionRate}%`, backgroundColor: Colors.primary }]} />
            </View>
          </View>

          <View style={styles.chartLine}>
            <View style={styles.chartLabelRow}>
              <Text style={styles.chartLabel}>Total Workload</Text>
              <Text style={styles.chartValue}>{totalTasks} Total</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '100%', backgroundColor: Colors.border }]} />
            </View>
          </View>
        </Animated.View>

        {/* Search Shortcut */}
        <Pressable 
          style={styles.searchShortcut} 
          onPress={() => router.push('/profile/search' as any)}
        >
          <View style={styles.searchIconBg}>
            <Ionicons name="search" size={20} color="#fff" />
          </View>
          <Text style={styles.searchShortcutText}>Looking for a specific task?</Text>
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
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  circleContainer: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  percentLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  summarySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
    marginTop: 8,
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
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chartLine: {
    marginBottom: 20,
  },
  chartLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
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
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  searchShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  searchIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchShortcutText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
