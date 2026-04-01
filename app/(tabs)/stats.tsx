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

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Floating Ring Progress Hero */}
        <Animated.View entering={FadeInUp.springify()} style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View style={styles.heroContent}>
            <View style={styles.ringWrapper}>
              <View style={[styles.ringTrack, { borderColor: Colors.primary + '20' }]}>
                <View style={[styles.ringFill, { borderColor: Colors.primary }]}>
                   <Text style={styles.heroPercentText}>{completionRate}%</Text>
                   <Text style={styles.heroPercentLabel}>Done</Text>
                </View>
              </View>
            </View>
            <View style={styles.heroInfo}>
               <Text style={styles.heroStatus}>Great Momentum!</Text>
               <Text style={styles.heroDescription}>You have already cleared {completedTasks} tasks. Keep it up!</Text>
            </View>
          </View>
        </Animated.View>

        {/* Overview Stats with Glowing Shadows */}
        <Text style={styles.sectionTitle}>Overview</Text>
        <View style={styles.statsGrid}>
          <Animated.View entering={FadeInRight.delay(200).springify()} style={[styles.glowCard, styles.shadowGreen]}>
            <View style={[styles.iconPlate, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="checkmark-done" size={24} color="#166534" />
            </View>
            <Text style={styles.glowCount}>{completedTasks}</Text>
            <Text style={styles.glowLabel}>Done</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(300).springify()} style={[styles.glowCard, styles.shadowAmber]}>
            <View style={[styles.iconPlate, { backgroundColor: '#FFFBEB' }]}>
              <Ionicons name="flash" size={24} color="#92400e" />
            </View>
            <Text style={styles.glowCount}>{inProgressTasks}</Text>
            <Text style={styles.glowLabel}>Doing</Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(400).springify()} style={[styles.glowCard, styles.shadowBlue]}>
            <View style={[styles.iconPlate, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="list" size={24} color="#1e40af" />
            </View>
            <Text style={styles.glowCount}>{todoTasks}</Text>
            <Text style={styles.glowLabel}>To Do</Text>
          </Animated.View>
        </View>

        {/* Dynamic Multi-Bar Progress */}
        <Text style={styles.sectionTitle}>Performance Detail</Text>
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.metricsCard}>
           <View style={styles.metricRow}>
              <View style={styles.metricHeader}>
                 <Text style={styles.metricName}>Efficiency</Text>
                 <Text style={styles.metricValue}>{completionRate}%</Text>
              </View>
              <View style={styles.barBg}>
                 <View style={[styles.barFill, { width: `${completionRate}%`, backgroundColor: Colors.primary }]} />
              </View>
           </View>

           <View style={styles.metricRow}>
              <View style={styles.metricHeader}>
                 <Text style={styles.metricName}>Activity Rate</Text>
                 <Text style={styles.metricValue}>88%</Text>
              </View>
              <View style={styles.barBg}>
                 <View style={[styles.barFill, { width: '88%', backgroundColor: '#6366f1' }]} />
              </View>
           </View>

           <View style={styles.metricRow}>
              <View style={styles.metricHeader}>
                 <Text style={styles.metricName}>Workload Focus</Text>
                 <Text style={styles.metricValue}>High</Text>
              </View>
              <View style={styles.barBg}>
                 <View style={[styles.barFill, { width: '70%', backgroundColor: '#ec4899' }]} />
              </View>
           </View>
        </Animated.View>

        {/* Visual Call-to-Action */}
        <Pressable 
          style={styles.ctaButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            router.push('/profile/categories' as any);
          }}
        >
          <View style={styles.ctaIconBg}>
            <Ionicons name="grid" size={20} color="#fff" />
          </View>
          <View style={styles.ctaTextWrapper}>
            <Text style={styles.ctaTitle}>Deep Organization</Text>
            <Text style={styles.ctaSubtitle}>Manage your custom categories</Text>
          </View>
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
    paddingTop: 8,
    paddingBottom: 120,
  },
  heroCard: {
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 32,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    position: 'relative',
  },
  heroGlow: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    backgroundColor: Colors.primary,
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
    color: Colors.textPrimary,
  },
  heroPercentLabel: {
    fontSize: 8,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  heroInfo: {
    flex: 1,
  },
  heroStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  heroDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  glowCard: {
    width: (width - 48 - 24) / 3,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shadowGreen: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  shadowAmber: {
    shadowColor: '#FBBF24',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  shadowBlue: {
    shadowColor: '#60A5FA',
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
    color: Colors.textPrimary,
  },
  glowLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  metricsCard: {
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
  barBg: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  ctaButton: {
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ctaIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary,
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
    color: Colors.textPrimary,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
