import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useTasks } from '@/context/TaskContext';
import Colors from '@/constants/color';
import { TaskStatus } from '@/constants/task';
import DateSelector, { DATES } from '@/components/DateSelector';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ICONS = ['grid', 'home', 'briefcase', 'school', 'barbell', 'cart', 'airplane', 'bulb', 'cash', 'heart'];
const COLORS = ['#FF6B8A', '#4ADE80', '#FBBF24', '#60A5FA', '#A78BFA', '#F472B6', '#34D399', '#F87171'];

const CreateTask = () => {
  const { addTask } = useTasks();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Todo');
  const [selectedDate, setSelectedDate] = useState<string>(DATES[2].key);
  
  const [selectedIcon, setSelectedIcon] = useState<string>('grid');
  const [selectedColor, setSelectedColor] = useState<string>('#60A5FA');

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
      icon: { name: selectedIcon, backgroundColor: selectedColor },
      createdAt: new Date(selectedDate).toISOString(),
    });

    // Reset and go back to home tab
    setTitle('');
    setCategory('');
    setStatus('Todo');
    router.replace('/');
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]} contentContainerStyle={styles.content}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create New Task</Text>
      </View>

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

        <Text style={styles.label}>Task Icon</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerRow}>
          {ICONS.map(icon => (
            <Pressable 
              key={icon} 
              style={[styles.iconOption, selectedIcon === icon && { borderColor: Colors.primary, borderWidth: 2 }]}
              onPress={() => setSelectedIcon(icon)}
            >
              <Ionicons name={icon as any} size={24} color={selectedIcon === icon ? Colors.primary : Colors.textSecondary} />
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.label}>Badge Color</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerRow}>
          {COLORS.map(color => (
            <Pressable 
              key={color} 
              style={[
                styles.colorOption, 
                { backgroundColor: color }, 
                selectedColor === color && styles.colorOptionSelected
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </ScrollView>

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

export default CreateTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  content: {
    paddingBottom: 100, // padding for tabs
  },
  card: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: '100%',
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
    marginTop: 10,
  },
  input: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    color: Colors.textPrimary,
    fontSize: 16,
    marginBottom: 10,
  },
  pickerRow: {
    gap: 12,
    paddingBottom: 20,
    paddingTop: 5,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  dateSelectorContainer: {
    marginHorizontal: -24,
    marginBottom: 10,
  },
  statusButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
    marginTop: 5,
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
