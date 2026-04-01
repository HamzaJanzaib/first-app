import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import AttractionBackground from '@/components/AttractionBackground';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export default function ProductivityStats() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const todoTasks = tasks.filter(t => t.status === 'Todo').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Analytics</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Floating Ring Progress Hero */}
        <Animated.View entering={FadeInUp.springify()} style={[styles.heroCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.heroGlow, { backgroundColor: colors.primary }]} />
          <View style={styles.heroContent}>
            <View style={styles.ringWrapper}>
              <View style={[styles.ringTrack, { borderColor: colors.primary + '20' }]}>
                <View style={[styles.ringFill, { borderColor: colors.primary }]}>
                   <Text style={[styles.heroPercentText, { color: colors.textPrimary }]}>{completionRate}%</Text>
                   <Text style={[styles.heroPercentLabel, { color: colors.textSecondary }]}>Done</Text>
                </View>
              </View>
            </View>
            <View style={styles.heroInfo}>
               <Text style={[styles.heroStatus, { color: colors.textPrimary }]}>Great Momentum!</Text>
               <Text style={[styles.heroDescription, { color: colors.textSecondary }]}>You have already cleared {completedTasks} tasks. Keep it up!</Text>
            </View>
          </View>
        </Animated.View>

        {/* Overview Stats with Glowing Shadows */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Overview</Text>
        <View style={styles.statsGrid}>
          <Animated.View entering={FadeInRight.delay(200).springify()} style={[styles.glowCard, styles.shadowGreen, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.statusDone }]}>
            <View style={[styles.iconPlate, { backgroundColor: colors.statusDone + '20' }]}>
              <Ionicons name="checkmark-done" size={24} color={colors.statusDone} />
            </View>
            <Text style={[styles.glowCount, { color: colors.textPrimary }]}>{completedTasks}</Text>
            <Text style={[styles.glowLabel, { color: colors.textSecondary }]}>Done</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(300).springify()} style={[styles.glowCard, styles.shadowAmber, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.statusInProgress }]}>
            <View style={[styles.iconPlate, { backgroundColor: colors.statusInProgress + '20' }]}>
              <Ionicons name="flash" size={24} color={colors.statusInProgress} />
            </View>
            <Text style={[styles.glowCount, { color: colors.textPrimary }]}>{inProgressTasks}</Text>
            <Text style={[styles.glowLabel, { color: colors.textSecondary }]}>Doing</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(400).springify()} style={[styles.glowCard, styles.shadowBlue, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.statusTodo }]}>
            <View style={[styles.iconPlate, { backgroundColor: colors.statusTodo + '20' }]}>
              <Ionicons name="list" size={24} color={colors.statusTodo} />
            </View>
            <Text style={[styles.glowCount, { color: colors.textPrimary }]}>{todoTasks}</Text>
            <Text style={[styles.glowLabel, { color: colors.textSecondary }]}>To Do</Text>
          </Animated.View>
        </View>

        {/* Dynamic Multi-Bar Progress */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Performance Detail</Text>
        <Animated.View entering={FadeInUp.delay(500).springify()} style={[styles.metricsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
           <View style={styles.metricRow}>
              <View style={styles.metricHeader}>
                 <Text style={[styles.metricName, { color: colors.textSecondary }]}>Efficiency</Text>
                 <Text style={[styles.metricValue, { color: colors.textPrimary }]}>{completionRate}%</Text>
              </View>
              <View style={[styles.barBg, { backgroundColor: colors.background }]}>
                 <View style={[styles.barFill, { width: `${completionRate}%`, backgroundColor: colors.primary }]} />
              </View>
           </View>

           <View style={styles.metricRow}>
              <View style={styles.metricHeader}>
                 <Text style={[styles.metricName, { color: colors.textSecondary }]}>Activity Rate</Text>
                 <Text style={[styles.metricValue, { color: colors.textPrimary }]}>88%</Text>
              </View>
              <View style={[styles.barBg, { backgroundColor: colors.background }]}>
                 <View style={[styles.barFill, { width: '88%', backgroundColor: '#6366f1' }]} />
              </View>
           </View>

           <View style={styles.metricRow}>
              <View style={styles.metricHeader}>
                 <Text style={[styles.metricName, { color: colors.textSecondary }]}>Workload Focus</Text>
                 <Text style={[styles.metricValue, { color: colors.textPrimary }]}>High</Text>
              </View>
              <View style={[styles.barBg, { backgroundColor: colors.background }]}>
                 <View style={[styles.barFill, { width: '70%', backgroundColor: '#ec4899' }]} />
              </View>
           </View>
        </Animated.View>

        {/* Visual Call-to-Action */}
        <Pressable 
          style={[styles.ctaButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push('/profile/categories' as any);
          }}
        >
          <View style={[styles.ctaIconBg, { backgroundColor: colors.primary }]}>
            <Ionicons name="grid" size={20} color="#fff" />
          </View>
          <View style={styles.ctaTextWrapper}>
            <Text style={[styles.ctaTitle, { color: colors.textPrimary }]}>Deep Organization</Text>
            <Text style={[styles.ctaSubtitle, { color: colors.textSecondary }]}>Manage your custom categories</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
        </Pressable>
      </ScrollView>
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
  content: {
    padding: 24,
    paddingTop: 8,
    paddingBottom: 120,
  },
  heroCard: {
    padding: 24,
    borderRadius: 32,
    marginBottom: 32,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    opacity: 0.1,
    borderRadius: 50,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ringWrapper: {
    marginRight: 24,
  },
  ringTrack: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringFill: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroPercentText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroPercentLabel: {
    fontSize: 8,
    textTransform: 'uppercase',
  },
  heroInfo: {
    flex: 1,
  },
  heroStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  glowCard: {
    width: (width - 48 - 24) / 3,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
  },
  shadowGreen: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  shadowAmber: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  shadowBlue: {
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  iconPlate: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  glowCount: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  glowLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  metricsCard: {
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 24,
  },
  metricRow: {
    marginBottom: 20,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricName: {
    fontSize: 14,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  barBg: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
  },
  ctaIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ctaTextWrapper: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaSubtitle: {
    fontSize: 13,
  },
});
