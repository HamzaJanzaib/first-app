import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import TaskForm from '@/components/TaskForm';
import Colors from '@/constants/color';

export default function EditTaskScreen() {
  const { taskId } = useLocalSearchParams<{ taskId: string }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_bottom'
      }} />
      <TaskForm 
        taskId={taskId} 
        onCancel={() => router.back()} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
