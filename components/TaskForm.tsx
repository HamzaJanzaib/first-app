import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, Pressable,
  ScrollView, Alert, Image, Platform, Animated as RNAnimated
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '@/context/TaskContext';
import { TaskStatus } from '@/constants/task';
import DateSelector, { DATES } from '@/components/DateSelector';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeInUp, FadeInDown, SlideInDown } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const ICONS = ['grid', 'home', 'briefcase', 'school', 'barbell', 'cart', 'airplane', 'bulb', 'cash', 'heart'];
const BADGE_COLORS = ['#FF6B8A', '#4ADE80', '#FBBF24', '#60A5FA', '#A78BFA', '#F472B6', '#34D399', '#F87171'];

type Attachment = {
  id: string;
  type: 'image' | 'document';
  uri: string;
  name: string;
};

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
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Todo');
  const [selectedDate, setSelectedDate] = useState<string>(DATES[2].key);
  const [selectedIcon, setSelectedIcon] = useState<string>('grid');
  const [selectedColor, setSelectedColor] = useState<string>('#60A5FA');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showCategoryDrop, setShowCategoryDrop] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isBullet, setIsBullet] = useState(false);

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
      Alert.alert("Missing Fields", "Please add a title and select a category.");
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const taskData = {
      title,
      category,
      status,
      time: taskId
        ? (tasks.find(t => t.id === taskId)?.time || '10:00 AM')
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: { name: selectedIcon, backgroundColor: selectedColor },
      createdAt: new Date(selectedDate).toISOString(),
    };
    if (isEditing) {
      updateTask({ id: taskId!, ...taskData });
    } else {
      addTask(taskData);
    }
    if (onCancel) onCancel();
    else router.replace('/');
  };

  const pickImage = async () => {
    const { status: permStatus } = await ImagePicker.requestCameraPermissionsAsync();
    Alert.alert('Add Photo', 'Choose an option', [
      {
        text: 'Camera', onPress: async () => {
          const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
          if (!result.canceled && result.assets[0]) {
            const asset = result.assets[0];
            setAttachments(prev => [...prev, { id: Date.now().toString(), type: 'image', uri: asset.uri, name: 'Photo' }]);
          }
        }
      },
      {
        text: 'Gallery', onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.8, mediaTypes: ImagePicker.MediaTypeOptions.Images });
          if (!result.canceled && result.assets[0]) {
            const asset = result.assets[0];
            setAttachments(prev => [...prev, { id: Date.now().toString(), type: 'image', uri: asset.uri, name: asset.fileName || 'Image' }]);
          }
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true });
      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        setAttachments(prev => [...prev, { id: Date.now().toString(), type: 'document', uri: asset.uri, name: asset.name }]);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not pick document.');
    }
  };

  const removeAttachment = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const insertBullet = () => {
    setIsBullet(!isBullet);
    if (!isBullet) {
      setDescription(prev => prev + (prev.length > 0 ? '\n• ' : '• '));
    }
  };

  const selectedCategoryObj = categories.find(c => c.name === category);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        {onCancel && (
          <Pressable onPress={onCancel} style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </Pressable>
        )}
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          {isEditing ? 'Edit Task' : 'New Task'}
        </Text>
        {onCancel ? <View style={{ width: 44 }} /> : null}
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>

        {/* Title */}
        <Animated.View entering={FadeInUp.delay(50).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Title</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.textPrimary }]}
            value={title}
            onChangeText={setTitle}
            placeholder="What needs to be done?"
            placeholderTextColor={colors.textSecondary}
          />
        </Animated.View>

        {/* Category - Inline Dropdown (NO modal, NO dark overlay) */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
          <Pressable
            style={[
              styles.dropdownBtn,
              { backgroundColor: colors.background, borderColor: category ? colors.primary : colors.border },
              showCategoryDrop && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowCategoryDrop(v => !v);
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
            <Ionicons name={showCategoryDrop ? "chevron-up" : "chevron-down"} size={16} color={colors.textSecondary} />
          </Pressable>

          {/* Inline dropdown list - no modal, no black blur */}
          {showCategoryDrop && (
            <Animated.View entering={SlideInDown.duration(200)} style={[styles.dropdownList, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
              {categories.map((item, index) => {
                const isSelected = category === item.name;
                return (
                  <Pressable
                    key={item.id}
                    style={[
                      styles.dropdownItem,
                      { borderBottomColor: colors.border },
                      isSelected && { backgroundColor: item.color + '12' },
                      index === categories.length - 1 && { borderBottomWidth: 0, borderBottomLeftRadius: 14, borderBottomRightRadius: 14 }
                    ]}
                    onPress={() => {
                      Haptics.selectionAsync();
                      setCategory(item.name);
                      setShowCategoryDrop(false);
                    }}
                  >
                    <View style={[styles.dropdownItemIcon, { backgroundColor: item.color + '20' }]}>
                      <Ionicons name={item.icon as any} size={18} color={item.color} />
                    </View>
                    <Text style={[styles.dropdownItemText, { color: isSelected ? item.color : colors.textPrimary }]}>{item.name}</Text>
                    {isSelected && <Ionicons name="checkmark-circle" size={18} color={item.color} />}
                  </Pressable>
                );
              })}
            </Animated.View>
          )}
        </Animated.View>

        {/* Description / Rich Text Editor */}
        <Animated.View entering={FadeInUp.delay(150).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Notes & Details</Text>
          {/* Formatting Toolbar */}
          <View style={[styles.textToolbar, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Pressable
              style={[styles.toolbarBtn, isBold && { backgroundColor: colors.primary + '25' }]}
              onPress={() => setIsBold(!isBold)}
            >
              <Text style={[styles.toolbarBtnLabel, { color: isBold ? colors.primary : colors.textSecondary, fontWeight: '900' }]}>B</Text>
            </Pressable>
            <View style={[styles.toolbarDivider, { backgroundColor: colors.border }]} />
            <Pressable
              style={[styles.toolbarBtn]}
              onPress={() => setDescription(prev => prev + '_italic text_ ')}
            >
              <Text style={[styles.toolbarBtnLabel, { color: colors.textSecondary, fontStyle: 'italic' }]}>I</Text>
            </Pressable>
            <View style={[styles.toolbarDivider, { backgroundColor: colors.border }]} />
            <Pressable
              style={[styles.toolbarBtn, isBullet && { backgroundColor: colors.primary + '25' }]}
              onPress={insertBullet}
            >
              <Ionicons name="list" size={18} color={isBullet ? colors.primary : colors.textSecondary} />
            </Pressable>
            <View style={[styles.toolbarDivider, { backgroundColor: colors.border }]} />
            <Pressable
              style={styles.toolbarBtn}
              onPress={() => setDescription(prev => prev + '\n☐ Checklist item\n')}
            >
              <Ionicons name="checkbox-outline" size={18} color={colors.textSecondary} />
            </Pressable>
            <View style={[styles.toolbarDivider, { backgroundColor: colors.border }]} />
            <Pressable
              style={styles.toolbarBtn}
              onPress={() => setDescription('')}
            >
              <Ionicons name="trash-outline" size={16} color="#f87171" />
            </Pressable>
          </View>
          <TextInput
            style={[
              styles.descriptionInput,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.textPrimary,
                fontWeight: isBold ? '700' : '400',
              }
            ]}
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Add notes, details, or a checklist…"
            placeholderTextColor={colors.textSecondary}
            multiline
            textAlignVertical="top"
          />
        </Animated.View>

        {/* Attachments */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Attachments</Text>
          <View style={styles.attachmentButtons}>
            <Pressable
              style={[styles.attachBtn, { backgroundColor: colors.background, borderColor: colors.border }]}
              onPress={pickImage}
            >
              <Ionicons name="camera-outline" size={22} color={colors.primary} />
              <Text style={[styles.attachBtnText, { color: colors.primary }]}>Camera / Gallery</Text>
            </Pressable>
            <Pressable
              style={[styles.attachBtn, { backgroundColor: colors.background, borderColor: colors.border }]}
              onPress={pickDocument}
            >
              <Ionicons name="document-attach-outline" size={22} color="#6366f1" />
              <Text style={[styles.attachBtnText, { color: '#6366f1' }]}>Document</Text>
            </Pressable>
          </View>

          {/* Attachment Previews */}
          {attachments.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.attachmentRow}>
              {attachments.map(att => (
                <View key={att.id} style={[styles.attachmentChip, { backgroundColor: colors.background, borderColor: colors.border }]}>
                  {att.type === 'image' ? (
                    <Image source={{ uri: att.uri }} style={styles.attachmentThumb} />
                  ) : (
                    <View style={[styles.attachmentDocIcon, { backgroundColor: '#6366f120' }]}>
                      <Ionicons name="document-text" size={28} color="#6366f1" />
                    </View>
                  )}
                  <Text style={[styles.attachmentName, { color: colors.textSecondary }]} numberOfLines={1}>{att.name}</Text>
                  <Pressable onPress={() => removeAttachment(att.id)} style={styles.removeAttachBtn}>
                    <Ionicons name="close-circle" size={18} color="#f87171" />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          )}
        </Animated.View>

        {/* Task Icon */}
        <Animated.View entering={FadeInUp.delay(250).springify()} style={styles.fieldGroup}>
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
        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.fieldGroup}>
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
              >
                {selectedColor === color && <Ionicons name="checkmark" size={14} color="#fff" />}
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Date */}
        <Animated.View entering={FadeInUp.delay(350).springify()} style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Date</Text>
          <View style={styles.dateSelectorContainer}>
            <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
          </View>
        </Animated.View>

        {/* Status */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.fieldGroup}>
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
        <Animated.View entering={FadeInDown.delay(450).springify()}>
          <Pressable style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSave}>
            <Ionicons name={isEditing ? "checkmark-done" : "add-circle"} size={22} color="#fff" />
            <Text style={styles.saveButtonText}>{isEditing ? 'Update Task' : 'Create Task'}</Text>
          </Pressable>
        </Animated.View>
      </View>
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
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  content: { paddingBottom: 100 },
  card: {
    borderTopLeftRadius: 36, borderTopRightRadius: 36,
    padding: 24, borderWidth: 1, minHeight: '100%',
  },
  fieldGroup: { marginBottom: 20 },
  label: { fontSize: 13, marginBottom: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { borderWidth: 1, borderRadius: 16, padding: 16, fontSize: 16, fontWeight: '500' },
  // Dropdown
  dropdownBtn: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderRadius: 16, padding: 14, gap: 10,
  },
  dropdownIconBox: { width: 34, height: 34, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  dropdownText: { flex: 1, fontSize: 16, fontWeight: '600' },
  dropdownPlaceholder: { flex: 1, fontSize: 16, fontWeight: '500' },
  dropdownList: {
    borderWidth: 1, borderTopWidth: 0,
    borderBottomLeftRadius: 16, borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, padding: 14, borderBottomWidth: 1,
  },
  dropdownItemIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  dropdownItemText: { flex: 1, fontSize: 15, fontWeight: '600' },
  // Rich text editor
  textToolbar: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderBottomWidth: 0,
    borderTopLeftRadius: 14, borderTopRightRadius: 14,
    overflow: 'hidden', paddingHorizontal: 4,
  },
  toolbarBtn: { paddingHorizontal: 14, paddingVertical: 10, justifyContent: 'center', alignItems: 'center' },
  toolbarBtnLabel: { fontSize: 17, fontWeight: '700' },
  toolbarDivider: { width: 1, height: 22, opacity: 0.4 },
  descriptionInput: {
    borderWidth: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0,
    borderBottomLeftRadius: 14, borderBottomRightRadius: 14,
    padding: 16, fontSize: 15, minHeight: 140, lineHeight: 22,
  },
  // Attachments
  attachmentButtons: { flexDirection: 'row', gap: 12, marginBottom: 14 },
  attachBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderWidth: 1, borderRadius: 16, paddingVertical: 14,
  },
  attachBtnText: { fontSize: 14, fontWeight: '700' },
  attachmentRow: { gap: 12 },
  attachmentChip: {
    width: 110, borderRadius: 16, borderWidth: 1,
    overflow: 'hidden', alignItems: 'center', paddingBottom: 10,
  },
  attachmentThumb: { width: '100%', height: 80, resizeMode: 'cover' },
  attachmentDocIcon: { width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' },
  attachmentName: { fontSize: 11, fontWeight: '600', paddingHorizontal: 8, marginTop: 6, textAlign: 'center' },
  removeAttachBtn: { marginTop: 4 },
  // Icon / Color pickers
  pickerRow: { gap: 12, paddingBottom: 8, paddingTop: 4 },
  iconOption: { width: 54, height: 54, borderRadius: 18, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  colorOption: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  colorOptionSelected: {
    borderWidth: 3, borderColor: '#ffffff',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6,
  },
  dateSelectorContainer: { marginHorizontal: -24 },
  statusButtons: { flexDirection: 'row', gap: 10, marginTop: 4 },
  statusButton: { flex: 1, paddingVertical: 14, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  statusButtonText: { fontSize: 13, fontWeight: '700' },
  saveButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, padding: 18, borderRadius: 20, marginTop: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5,
  },
  saveButtonText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
});
