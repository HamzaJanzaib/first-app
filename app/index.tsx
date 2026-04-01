import Colors from '@/constants/color';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterOptions, TASKS } from '@/constants/task';
import Header from '@/components/Header';
import DateSelector from '@/components/DateSelector';
import React from 'react';
import FilterTabs from '@/components/FilterTabs';
import TaskCard from '@/components/TaskCard';

const Index = () => {
  const insets = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = React.useState<FilterOptions>('All');
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }]} >
      <ExpoStatusBar style="light" backgroundColor={Colors.background} />

      <FlatList
        data={TASKS}
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
        renderItem={({ item }) => <TaskCard task={item} />}
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
    padding: 12,
  }
})