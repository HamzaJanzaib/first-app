import React from 'react';
import {
  View, Text, StyleSheet, Pressable, Alert, ScrollView, Dimensions
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTasks } from '@/context/TaskContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AttractionBackground from '@/components/AttractionBackground';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

const STATUS_CONFIG = {
  'Done':        { color: '#4ade80', icon: 'checkmark-circle' as const, label: 'Completed' },
  'In Progress': { color: '#fbbf24', icon: 'flash' as const,            label: 'In Progress' },
  'Todo':        { color: '#60a5fa', icon: 'ellipse' as const,          label: 'To Do' },
};

const TaskDetails = () => {
  const { id } = useLocalSearchParams();
  const { tasks, deleteTask } = useTasks();
  const { colors, isDark } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Ionicons name="alert-circle-outline" size={64} color={colors.textSecondary} />
        <Text style={[styles.errorText, { color: colors.textSecondary }]}>Task not found</Text>
        <Pressable onPress={() => router.back()} style={[styles.backFallback, { backgroundColor: colors.primary }]}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const badgeColor = task.icon.backgroundColor || colors.primary;
  const statusCfg = STATUS_CONFIG[task.status] || STATUS_CONFIG['Todo'];
  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  const handleEdit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: '/edit-task', params: { taskId: id as string } } as any);
  };

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert('Delete Task', 'This action cannot be undone. Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: () => { deleteTask(task.id); router.replace('/'); },
      },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.navBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Task Details</Text>
        <Pressable
          onPress={handleEdit}
          style={[styles.navBtn, { backgroundColor: colors.primary }]}
        >
          <Ionicons name="pencil" size={18} color="#fff" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero Card */}
        <Animated.View entering={FadeInUp.springify()} style={[styles.heroCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {/* Decorative glow behind icon */}
          <View style={[styles.cardGlow, { backgroundColor: badgeColor }]} />

          {/* Icon + category */}
          <Animated.View entering={ZoomIn.delay(100).springify()} style={[styles.iconBadge, { backgroundColor: badgeColor, shadowColor: badgeColor }]}>
            <Ionicons name={task.icon.name as any} size={36} color="#fff" />
          </Animated.View>

          <Text style={[styles.categoryLabel, { color: colors.textSecondary }]}>{task.category}</Text>
          <Text style={[styles.taskTitle, { color: colors.textPrimary }]}>{task.title}</Text>

          {/* Status Pill */}
          <Animated.View
            entering={FadeInUp.delay(200).springify()}
            style={[styles.statusPill, { backgroundColor: statusCfg.color + '20', borderColor: statusCfg.color }]}
          >
            <Ionicons name={statusCfg.icon} size={16} color={statusCfg.color} />
            <Text style={[styles.statusPillText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
          </Animated.View>
        </Animated.View>

        {/* Meta Info Cards */}
        <Animated.View entering={FadeInUp.delay(150).springify()} style={styles.metaRow}>
          {/* Time */}
          <View style={[styles.metaCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.primary }]}>
            <View style={[styles.metaIconBox, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="time" size={22} color={colors.primary} />
            </View>
            <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>Time</Text>
            <Text style={[styles.metaValue, { color: colors.textPrimary }]}>{task.time}</Text>
          </View>

          {/* Date */}
          <View style={[styles.metaCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: '#6366f1' }]}>
            <View style={[styles.metaIconBox, { backgroundColor: '#6366f120' }]}>
              <Ionicons name="calendar" size={22} color="#6366f1" />
            </View>
            <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>Date</Text>
            <Text style={[styles.metaValue, { color: colors.textPrimary }]} numberOfLines={2}>
              {new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </View>

          {/* Priority */}
          <View style={[styles.metaCard, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: statusCfg.color }]}>
            <View style={[styles.metaIconBox, { backgroundColor: statusCfg.color + '20' }]}>
              <Ionicons name="flag" size={22} color={statusCfg.color} />
            </View>
            <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>Status</Text>
            <Text style={[styles.metaValue, { color: statusCfg.color }]} numberOfLines={2}>{task.status}</Text>
          </View>
        </Animated.View>

        {/* Full Date Detail */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={[styles.detailCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.detailRow}>
            <View style={[styles.detailIconBox, { backgroundColor: colors.primary + '15' }]}>
              <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            </View>
            <View style={styles.detailTextBlock}>
              <Text style={[styles.detailCardLabel, { color: colors.textSecondary }]}>Full Date</Text>
              <Text style={[styles.detailCardValue, { color: colors.textPrimary }]}>{formattedDate}</Text>
            </View>
          </View>

          <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />

          <View style={styles.detailRow}>
            <View style={[styles.detailIconBox, { backgroundColor: statusCfg.color + '15' }]}>
              <Ionicons name={statusCfg.icon} size={20} color={statusCfg.color} />
            </View>
            <View style={styles.detailTextBlock}>
              <Text style={[styles.detailCardLabel, { color: colors.textSecondary }]}>Progress Stage</Text>
              <Text style={[styles.detailCardValue, { color: statusCfg.color }]}>{statusCfg.label}</Text>
            </View>
          </View>

          <View style={[styles.detailDivider, { backgroundColor: colors.border }]} />

          <View style={styles.detailRow}>
            <View style={[styles.detailIconBox, { backgroundColor: '#10b98115' }]}>
              <Ionicons name="folder-outline" size={20} color="#10b981" />
            </View>
            <View style={styles.detailTextBlock}>
              <Text style={[styles.detailCardLabel, { color: colors.textSecondary }]}>Category</Text>
              <Text style={[styles.detailCardValue, { color: colors.textPrimary }]}>{task.category}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.actions}>
          <Pressable style={[styles.editBtn, { backgroundColor: colors.primary }]} onPress={handleEdit}>
            <Ionicons name="pencil-outline" size={20} color="#fff" />
            <Text style={styles.actionBtnText}>Edit Task</Text>
          </Pressable>

          <Pressable style={styles.deleteBtn} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color="#f87171" />
            <Text style={[styles.actionBtnText, { color: '#f87171' }]}>Delete</Text>
          </Pressable>
        </Animated.View>

      </ScrollView>
    </View>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  errorText: { fontSize: 18, fontWeight: '600' },
  backFallback: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14, marginTop: 8 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  navBtn: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1,
  },
  headerTitle: { fontSize: 20, fontWeight: '800' },

  content: { padding: 20, paddingBottom: 120, gap: 16 },

  // Hero Card
  heroCard: {
    borderRadius: 32, borderWidth: 1, padding: 28,
    overflow: 'hidden', position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, shadowRadius: 20, elevation: 6,
  },
  cardGlow: {
    position: 'absolute', top: -40, right: -40,
    width: 140, height: 140, borderRadius: 70, opacity: 0.12,
  },
  iconBadge: {
    width: 72, height: 72, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  categoryLabel: {
    fontSize: 13, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 28, fontWeight: '800',
    lineHeight: 34, marginBottom: 20,
  },
  statusPill: {
    flexDirection: 'row', alignItems: 'center',
    alignSelf: 'flex-start', gap: 8,
    paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1,
  },
  statusPillText: { fontSize: 14, fontWeight: '700' },

  // Meta Row
  metaRow: { flexDirection: 'row', gap: 12 },
  metaCard: {
    flex: 1, borderRadius: 22, borderWidth: 1, padding: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15, shadowRadius: 10, elevation: 4,
  },
  metaIconBox: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  metaLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4, textAlign: 'center' },
  metaValue: { fontSize: 14, fontWeight: '800', textAlign: 'center' },

  // Detail Card
  detailCard: {
    borderRadius: 28, borderWidth: 1, overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  detailRow: { flexDirection: 'row', alignItems: 'center', padding: 18, gap: 16 },
  detailDivider: { height: 1, marginHorizontal: 18 },
  detailIconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  detailTextBlock: { flex: 1 },
  detailCardLabel: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  detailCardValue: { fontSize: 16, fontWeight: '700' },

  // Actions
  actions: { gap: 12 },
  editBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    gap: 10, padding: 18, borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2, shadowRadius: 12, elevation: 6,
  },
  deleteBtn: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    gap: 10, padding: 18, borderRadius: 22,
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    borderWidth: 1, borderColor: 'rgba(248, 113, 113, 0.3)',
  },
  actionBtnText: { fontSize: 17, fontWeight: '800', color: '#fff' },
});
