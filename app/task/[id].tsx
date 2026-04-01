import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTasks } from '@/context/TaskContext';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { TaskStatus } from '@/constants/task';
import * as Haptics from 'expo-haptics';

const TaskDetails = () => {
  const { id } = useLocalSearchParams();
  const { tasks, updateTask, deleteTask } = useTasks();
  const router = useRouter();

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return (
      <View style={styles.centered}>
        <Stack.Screen options={{ headerShown: true, title: 'Error' }} />
        <Text style={styles.errorText}>Task not found</Text>
      </View>
    );
  }

  const handleEdit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/edit-task',
      params: { taskId: id as string }
    } as any);
  };

  const handleDelete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteTask(task.id);
          router.replace('/');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Details', headerShown: true, headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }} />
      
      <View style={styles.card}>
        <View style={[styles.iconBadge, { backgroundColor: task.icon.backgroundColor || Colors.primary }]}>
          <Ionicons name={task.icon.name as any} size={32} color="#fff" />
        </View>
        
        <Text style={styles.category}>{task.category}</Text>
        <Text style={styles.title}>{task.title}</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>{task.time}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>{new Date(task.createdAt).toLocaleDateString()}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="flag-outline" size={20} color={Colors.primary} />
          <Text style={styles.infoText}>{task.status}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.editButton} onPress={handleEdit}>
            <Ionicons name="pencil" size={20} color="#fff" />
            <Text style={styles.actionText}>Edit Task</Text>
          </Pressable>
          
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash" size={20} color="#fff" />
            <Text style={styles.actionText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default TaskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    color: Colors.statusInProgress,
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  category: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  infoText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: Colors.statusInProgress,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    color: Colors.textPrimary,
    fontSize: 16,
    marginBottom: 20,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  statusButtonText: {
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  statusButtonTextActive: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});
