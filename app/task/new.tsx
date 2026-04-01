import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTasks } from '@/context/TaskContext';
import Colors from '@/constants/color';
import { TaskStatus } from '@/constants/task';
import DateSelector, { DATES } from '@/components/DateSelector';

const NewTask = () => {
  const { addTask } = useTasks();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Todo');
  const [selectedDate, setSelectedDate] = useState<string>(DATES[2].key);

  const handleSave = () => {
    if (!title.trim() || !category.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    addTask({
      title,
      category,
      status,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: { name: 'add-circle', backgroundColor: Colors.primary },
      createdAt: new Date(selectedDate).toISOString(),
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Create New Task', headerShown: true, headerStyle: { backgroundColor: Colors.surface }, headerTintColor: Colors.textPrimary }} />
      
      <View style={styles.card}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Task Title"
          placeholderTextColor={Colors.textSecondary}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="e.g. Design, Work, Personal"
          placeholderTextColor={Colors.textSecondary}
        />

        <Text style={styles.label}>Date Created</Text>
        <View style={styles.dateSelectorContainer}>
           <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </View>

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusButtons}>
          {(['Todo', 'In Progress', 'Done'] as TaskStatus[]).map((s) => (
            <Pressable
              key={s}
              style={[styles.statusButton, status === s && styles.statusButtonActive]}
              onPress={() => setStatus(s)}
            >
              <Text style={[styles.statusButtonText, status === s && styles.statusButtonTextActive]}>
                {s}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Create Task</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
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
  dateSelectorContainer: {
    marginHorizontal: -24, // Break out of card padding slightly for full width scrolling
    marginBottom: 20,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
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
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
