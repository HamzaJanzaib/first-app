import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';
import AttractionBackground from '@/components/AttractionBackground';
import * as Haptics from 'expo-haptics';

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const { tasks } = useTasks();

  const upcomingTasks = tasks.filter(t => t.status !== 'Done');
  const doneTasks = tasks.filter(t => t.status === 'Done');

  const STATUS_COLOR: Record<string, string> = {
    'In Progress': '#fbbf24',
    'Todo': '#60a5fa',
    'Done': '#4ade80',
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <Animated.View entering={FadeInDown.springify()} style={styles.header}>
        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }}
          style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Notifications</Text>
          <Text style={[styles.headerSub, { color: colors.textSecondary }]}>
            {upcomingTasks.length} pending reminders
          </Text>
        </View>
        <View style={{ width: 44 }} />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Summary Banner */}
        <Animated.View entering={FadeInDown.delay(80).springify()} style={[styles.summaryBanner, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '30' }]}>
          <View style={[styles.summaryIconBox, { backgroundColor: colors.primary }]}>
            <Ionicons name="notifications" size={22} color="#fff" />
          </View>
          <View style={styles.summaryText}>
            <Text style={[styles.summaryTitle, { color: colors.textPrimary }]}>
              {upcomingTasks.length === 0 ? 'All caught up! 🎉' : `${upcomingTasks.length} tasks need attention`}
            </Text>
            <Text style={[styles.summarySubtitle, { color: colors.textSecondary }]}>
              {doneTasks.length} completed today
            </Text>
          </View>
        </Animated.View>

        {/* Upcoming Tasks */}
        {upcomingTasks.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Upcoming & Pending</Text>
            {upcomingTasks.map((task, index) => (
              <Animated.View
                key={task.id}
                entering={SlideInRight.delay(index * 80).springify()}
                style={[styles.notifCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={[styles.notifIconBox, { backgroundColor: task.icon.backgroundColor || colors.primary }]}>
                  <Ionicons name={task.icon.name as any} size={20} color="#fff" />
                </View>
                <View style={styles.notifBody}>
                  <Text style={[styles.notifTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                    {task.title}
                  </Text>
                  <View style={styles.notifMeta}>
                    <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                    <Text style={[styles.notifTime, { color: colors.textSecondary }]}>{task.time}</Text>
                    <View style={[styles.statusDot, { backgroundColor: STATUS_COLOR[task.status] || colors.primary }]} />
                    <Text style={[styles.notifStatus, { color: STATUS_COLOR[task.status] || colors.primary }]}>
                      {task.status}
                    </Text>
                  </View>
                </View>
                <Pressable
                  style={[styles.notifChevron, { backgroundColor: colors.background }]}
                  onPress={() => router.push(`/task/${task.id}` as any)}
                >
                  <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
                </Pressable>
              </Animated.View>
            ))}
          </>
        )}

        {/* Empty State */}
        {upcomingTasks.length === 0 && (
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.emptyContainer}>
            <View style={[styles.emptyIconCircle, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Ionicons name="checkmark-done-circle" size={56} color="#4ade80" />
            </View>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>All Done!</Text>
            <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
              You have no pending tasks. Time to add more goals!
            </Text>
          </Animated.View>
        )}
      </ScrollView>
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
    paddingVertical: 14,
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1,
  },
  headerTitle: { fontSize: 22, fontWeight: '800', textAlign: 'center' },
  headerSub: { fontSize: 12, textAlign: 'center', fontWeight: '500', marginTop: 2 },

  content: { padding: 20, paddingBottom: 100, gap: 10 },

  summaryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    marginBottom: 10,
  },
  summaryIconBox: {
    width: 48, height: 48, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  summaryText: { flex: 1 },
  summaryTitle: { fontSize: 16, fontWeight: '800', marginBottom: 3 },
  summarySubtitle: { fontSize: 13, fontWeight: '500' },

  sectionTitle: {
    fontSize: 13, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.7,
    marginBottom: 6, marginTop: 6,
  },

  notifCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 1,
    padding: 14,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  notifIconBox: {
    width: 46, height: 46, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  notifBody: { flex: 1 },
  notifTitle: { fontSize: 15, fontWeight: '700', marginBottom: 5 },
  notifMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  notifTime: { fontSize: 12, fontWeight: '500' },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  notifStatus: { fontSize: 12, fontWeight: '700' },
  notifChevron: {
    width: 30, height: 30, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },

  emptyContainer: { alignItems: 'center', marginTop: 60, gap: 16, paddingHorizontal: 40 },
  emptyIconCircle: {
    width: 110, height: 110, borderRadius: 55,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, marginBottom: 8,
  },
  emptyTitle: { fontSize: 24, fontWeight: '800' },
  emptySubtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
});
