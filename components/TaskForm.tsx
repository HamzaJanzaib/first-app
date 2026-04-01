import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '@/context/TaskContext';
import { TaskStatus } from '@/constants/task';
import DateSelector, { DATES } from '@/components/DateSelector';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';

const ICONS = ['grid', 'home', 'briefcase', 'school', 'barbell', 'cart', 'airplane', 'bulb', 'cash', 'heart'];
const BADGE_COLORS = ['#FF6B8A', '#4ADE80', '#FBBF24', '#60A5FA', '#A78BFA', '#F472B6', '#34D399', '#F87171'];

interface TaskFormProps {
  taskId?: string;
  onCancel?: () => void;
}

export default function TaskForm({ taskId, onCancel }: TaskFormProps) {
  const { addTask, updateTask, tasks, categories } = useTasks();
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Todo');
  const [selectedDate, setSelectedDate] = useState<string>(DATES[2].key);
  const [selectedIcon, setSelectedIcon] = useState<string>('grid');
  const [selectedColor, setSelectedColor] = useState<string>('#60A5FA');
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const isEditing = !!taskId;

  useEffect(() => {
    if (taskId) {
      const taskToEdit = tasks.find(t => t.id === taskId);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setCategory(taskToEdit.category);
        setStatus(taskToEdit.status);
        setSelectedIcon(taskToEdit.icon.name);
        setSelectedColor(taskToEdit.icon.backgroundColor || '#60A5FA');
        const dateKey = taskToEdit.createdAt.split('T')[0];
        setSelectedDate(dateKey);
      }
    }
  }, [taskId, tasks]);

  const handleSave = () => {
    if (!title.trim() || !category.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const taskData = {
      title,
      category,
      status,
      time: taskId ? (tasks.find(t => t.id === taskId)?.time || '10:00 AM') : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: { name: selectedIcon, backgroundColor: selectedColor },
      createdAt: new Date(selectedDate).toISOString(),
    };
    if (isEditing) {
      updateTask({ id: taskId!, ...taskData });
    } else {
      addTask(taskData);
    }
    if (onCancel) {
      onCancel();
    } else {
      router.replace('/');
    }
  };

  const selectedCategoryObj = categories.find(c => c.name === category);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        {onCancel && (
          <Pressable onPress={onCancel} style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </Pressable>
        )}
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {isEditing ? 'Edit Task' : 'Create New Task'}
        </Text>
        {onCancel && <View style={{ width: 44 }} />}
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>

        {/* Title */}
        <Animated.View entering={FadeInUp.delay(50).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Title</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.textPrimary }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Task Title"
            placeholderTextColor={colors.textSecondary}
          />
        </Animated.View>

        {/* Category Dropdown */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
          <Pressable
            style={[styles.dropdownBtn, { backgroundColor: colors.background, borderColor: category ? colors.primary : colors.border }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowCategoryModal(true);
            }}
          >
            {selectedCategoryObj ? (
              <>
                <View style={[styles.dropdownIconBox, { backgroundColor: selectedCategoryObj.color + '20' }]}>
                  <Ionicons name={selectedCategoryObj.icon as any} size={18} color={selectedCategoryObj.color} />
                </View>
                <Text style={[styles.dropdownText, { color: colors.textPrimary }]}>{category}</Text>
              </>
            ) : (
              <>
                <Ionicons name="folder-outline" size={18} color={colors.textSecondary} style={{ marginRight: 10 }} />
                <Text style={[styles.dropdownPlaceholder, { color: colors.textSecondary }]}>Select a category…</Text>
              </>
            )}
            <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
          </Pressable>
        </Animated.View>

        {/* Task Icon */}
        <Animated.View entering={FadeInUp.delay(150).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Task Icon</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerRow}>
            {ICONS.map(icon => (
              <Pressable
                key={icon}
                style={[
                  styles.iconOption,
                  { backgroundColor: colors.background, borderColor: colors.border },
                  selectedIcon === icon && { borderColor: colors.primary, borderWidth: 2 }
                ]}
                onPress={() => setSelectedIcon(icon)}
              >
                <Ionicons name={icon as any} size={24} color={selectedIcon === icon ? colors.primary : colors.textSecondary} />
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Badge Color */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Badge Color</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pickerRow}>
            {BADGE_COLORS.map(color => (
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
        </Animated.View>

        {/* Date */}
        <Animated.View entering={FadeInUp.delay(250).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Date</Text>
          <View style={styles.dateSelectorContainer}>
            <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </View>
        </Animated.View>

        {/* Status */}
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Status</Text>
          <View style={styles.statusButtons}>
            {(['Todo', 'In Progress', 'Done'] as TaskStatus[]).map((s) => (
              <Pressable
                key={s}
                style={[
                  styles.statusButton,
                  { borderColor: colors.border },
                  status === s && { backgroundColor: colors.primary, borderColor: colors.primary }
                ]}
                onPress={() => setStatus(s)}
              >
                <Text style={[styles.statusButtonText, { color: colors.textPrimary }, status === s && { color: '#fff' }]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {/* Save */}
        <Animated.View entering={FadeInDown.delay(350).springify()}>
          <Pressable style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{isEditing ? 'Update Task' : 'Create Task'}</Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* Category Picker Modal */}
      <Modal visible={showCategoryModal} transparent animationType="slide" onRequestClose={() => setShowCategoryModal(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalDismiss} onPress={() => setShowCategoryModal(false)} />
          <Animated.View entering={FadeInUp.springify()} style={[styles.modalSheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.modalHandle, { backgroundColor: colors.border }]} />
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Choose Category</Text>
            <FlatList
              data={categories}
              keyExtractor={item => item.id}
              contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
              renderItem={({ item }) => {
                const isSelected = category === item.name;
                return (
                  <Pressable
                    style={[
                      styles.categoryRow,
                      { backgroundColor: isSelected ? item.color + '15' : colors.background, borderColor: isSelected ? item.color : colors.border }
                    ]}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setCategory(item.name);
                      setShowCategoryModal(false);
                    }}
                  >
                    <View style={[styles.categoryRowIcon, { backgroundColor: item.color + '20' }]}>
                      <Ionicons name={item.icon as any} size={22} color={item.color} />
                    </View>
                    <Text style={[styles.categoryRowText, { color: isSelected ? item.color : colors.textPrimary }]}>{item.name}</Text>
                    {isSelected && <Ionicons name="checkmark-circle" size={22} color={item.color} />}
                  </Pressable>
                );
              }}
            />
          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: { paddingBottom: 100 },
  card: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 24,
    borderWidth: 1,
    minHeight: '100%',
    gap: 6,
  },
  fieldGroup: { marginBottom: 16 },
  label: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  dropdownIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownPlaceholder: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  pickerRow: { gap: 12, paddingBottom: 8, paddingTop: 4 },
  iconOption: {
    width: 54,
    height: 54,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  dateSelectorContainer: { marginHorizontal: -24 },
  statusButtons: { flexDirection: 'row', gap: 10, marginTop: 4 },
  statusButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusButtonText: { fontSize: 13, fontWeight: '700' },
  saveButton: {
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  saveButtonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalDismiss: { flex: 1 },
  modalSheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 24,
    paddingBottom: 50,
    maxHeight: '60%',
  },
  modalHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: '800', marginBottom: 16 },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
  },
  categoryRowIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryRowText: { flex: 1, fontSize: 16, fontWeight: '700' },
});
