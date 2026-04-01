import Colors from '@/constants/color';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterOptions } from '@/constants/task';
import Header from '@/components/Header';
import DateSelector, { DATES } from '@/components/DateSelector';
import React, { useMemo, useState } from 'react';
import FilterTabs from '@/components/FilterTabs';
import TaskCard from '@/components/TaskCard';
import { useTasks } from '@/context/TaskContext';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Index = () => {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState<FilterOptions>('All');
  const [selectedDate, setSelectedDate] = useState<string>(DATES[2].key);
  const { tasks } = useTasks();

  const filteredTasks = useMemo(() => {
    let result = tasks;

    // First filter by Selected Date
    result = result.filter(
      (task) => task.createdAt.split('T')[0] === selectedDate
    );

    // Then filter by Task Status if not 'All'
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

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right }]} >
      <ExpoStatusBar style="light" backgroundColor={Colors.background} />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <Header />
            <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <FilterTabs selected={selectedFilter} onSelect={setSelectedFilter} />
          </>
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link href={`/task/${item.id}` as any} asChild>
            <Pressable>
              <TaskCard task={item} />
            </Pressable>
          </Link>
        )}
      />

    </View>
  )
}
export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    color: Colors.textPrimary,
  },
  list: {
    padding: 8,
    paddingBottom: 40,
  }
})
