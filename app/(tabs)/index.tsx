import { FlatList, Pressable, StyleSheet, Text, View, Modal } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterOptions } from '@/constants/task';
import Header from '@/components/Header';
import DateSelector, { DATES, TODAY_KEY } from '@/components/DateSelector';
import React, { useMemo, useState } from 'react';
import FilterTabs from '@/components/FilterTabs';
import TaskCard from '@/components/TaskCard';
import { useTasks } from '@/context/TaskContext';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown, FadeOut } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import AttractionBackground from '@/components/AttractionBackground';
import { useTheme } from '@/context/ThemeContext';

const Index = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors, theme } = useTheme();
  
  const [selectedFilter, setSelectedFilter] = useState<FilterOptions>('All');
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_KEY);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const { tasks } = useTasks();

  const filteredTasks = useMemo(() => {
    let result = tasks;
    result = result.filter(
      (task) => task.createdAt.split('T')[0] === selectedDate
    );
    if (selectedFilter !== 'All') {
      const statusMap: Record<string, string> = {
        'To do': 'Todo',
        'In Progress': 'In Progress',
        'Completed': 'Done'
      };
      result = result.filter((task) => task.status === statusMap[selectedFilter]);
    }
    return result;
  }, [tasks, selectedFilter, selectedDate]);

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter(t => t.status !== 'Done')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
  }, [tasks]);

  const handleOpenNotifications = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsNotificationVisible(true);
  };

  const handleOpenSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/profile/search' as any);
  };

  const handleViewAll = () => {
    setIsNotificationVisible(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/profile/notifications' as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]} >
      <AttractionBackground />
      <ExpoStatusBar style={theme === 'dark' ? 'light' : 'dark'} backgroundColor={colors.background} />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Header 
              onPressNotification={handleOpenNotifications} 
              onPressSearch={handleOpenSearch}
            />
            <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <FilterTabs selected={selectedFilter} onSelect={setSelectedFilter} />
          </>
        }
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100).springify()}>
            <Link href={`/task/${item.id}` as any} asChild>
              <Pressable>
                <TaskCard task={item} />
              </Pressable>
            </Link>
          </Animated.View>
        )}
      />

      {/* Notification Modal */}
      <Modal
        visible={isNotificationVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsNotificationVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable 
            style={styles.modalDismiss} 
            onPress={() => setIsNotificationVisible(false)} 
          />
          <Animated.View 
            entering={FadeInDown.springify()} 
            exiting={FadeOut.duration(200)}
            style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Notifications</Text>
              <Pressable 
                onPress={() => setIsNotificationVisible(false)}
                style={styles.closeBtn}
              >
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>

            <View style={styles.notifList}>
              {upcomingTasks.length === 0 ? (
                <Text style={[styles.emptyNotif, { color: colors.textSecondary }]}>You're all caught up!</Text>
              ) : (
                upcomingTasks.map((task) => (
                  <View key={task.id} style={[styles.notifItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    <View style={[styles.notifIcon, { backgroundColor: task.icon.backgroundColor || colors.primary }]}>
                      <Ionicons name={task.icon.name as any} size={16} color="#fff" />
                    </View>
                    <View style={styles.notifText}>
                      <Text style={[styles.notifLabel, { color: colors.textPrimary }]} numberOfLines={1}>Upcoming: {task.title}</Text>
                      <Text style={[styles.notifTime, { color: colors.textSecondary }]}>{task.time}</Text>
                    </View>
                  </View>
                ))
              )}
            </View>

            <Pressable style={styles.viewAllBtn} onPress={handleViewAll}>
              <Text style={[styles.viewAllText, { color: colors.primary }]}>View all notifications</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.primary} />
            </Pressable>
          </Animated.View>
        </View>
      </Modal>

    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 8,
    paddingBottom: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalDismiss: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: '100%',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  closeBtn: {
    padding: 4,
  },
  notifList: {
    gap: 16,
    marginBottom: 24,
  },
  notifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  notifIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  notifText: {
    flex: 1,
  },
  notifLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  notifTime: {
    fontSize: 12,
  },
  emptyNotif: {
    textAlign: 'center',
    marginVertical: 20,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
