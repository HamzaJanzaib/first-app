import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import TaskForm from '@/components/TaskForm';
import Colors from '@/constants/color';
import { useEffect } from 'react';

export default function CreateTab() {
  const { taskId } = useLocalSearchParams<{ taskId?: string }>();
  const router = useRouter();

  // If taskId is provided to this tab, redirect to the root Edit screen
  // to ensure the tab bar is hidden.
  useEffect(() => {
    if (taskId) {
      router.replace({
        pathname: '/edit-task',
        params: { taskId }
      } as any);
    }
  }, [taskId]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <TaskForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
