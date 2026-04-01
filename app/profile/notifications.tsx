import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTasks } from '@/context/TaskContext';
import * as Haptics from 'expo-haptics';

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { tasks } = useTasks();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const upcomingTasks = tasks.filter(t => t.status !== 'Done');

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {upcomingTasks.length === 0 ? (
          <Text style={styles.emptyText}>You have no upcoming tasks.</Text>
        ) : (
          upcomingTasks.map((task, index) => (
            <Animated.View 
              key={task.id} 
              entering={FadeInLeft.delay(index * 100).springify()} 
              style={styles.notificationCard}
            >
              <View style={[styles.iconContainer, { backgroundColor: task.icon.backgroundColor || Colors.primary }]}>
                <Ionicons name={task.icon.name as any} size={20} color="#fff" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.notificationTitle}>Upcoming: {task.title}</Text>
                <Text style={styles.notificationTime}>Scheduled for {task.time}</Text>
              </View>
            </Animated.View>
          ))
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
    padding: 16,
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
