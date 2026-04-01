import Colors from '@/constants/color';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterOptions } from '@/constants/task';
import Header from '@/components/Header';
import DateSelector from '@/components/DateSelector';
import React, { useMemo } from 'react';
import FilterTabs from '@/components/FilterTabs';
import TaskCard from '@/components/TaskCard';
import { useTasks } from '@/context/TaskContext';
import { Link } from 'expo-router';

const Index = () => {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = React.useState<FilterOptions>('All');
  const { tasks } = useTasks();

  const filteredTasks = useMemo(() => {
    if (selectedFilter === 'All') return tasks;

    // Map the FilterOptions to the actual TaskStatus
    const statusMap: Record<string, string> = {
      'To do': 'To-do',
      'In Progress': 'In Progress',
      'Completed': 'Done'
    };

    return tasks.filter((task) => task.status === statusMap[selectedFilter]);
  }, [tasks, selectedFilter]);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]} >
      <ExpoStatusBar style="light" backgroundColor={Colors.background} />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            {/* header */}
            <Header />
            {/* date selector */}
            <DateSelector />
            {/* filters tabs */}
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
  }
})