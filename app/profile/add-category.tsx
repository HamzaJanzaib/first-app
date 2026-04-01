import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Modal, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AttractionBackground from '@/components/AttractionBackground';
import { useTheme } from '@/context/ThemeContext';
import { useTasks } from '@/context/TaskContext';

const ICON_OPTIONS = [
  { name: 'folder', label: 'Folder' },
  { name: 'briefcase', label: 'Work' },
  { name: 'heart', label: 'Health' },
  { name: 'book', label: 'Study' },
  { name: 'cart', label: 'Shopping' },
  { name: 'home', label: 'Home' },
  { name: 'color-palette', label: 'Design' },
  { name: 'barbell', label: 'Fitness' },
  { name: 'code-slash', label: 'Dev' },
  { name: 'cash', label: 'Finance' },
  { name: 'airplane', label: 'Travel' },
  { name: 'bulb', label: 'Ideas' },
  { name: 'musical-notes', label: 'Music' },
  { name: 'camera', label: 'Photo' },
  { name: 'leaf', label: 'Nature' },
  { name: 'rocket', label: 'Goals' },
];

const COLOR_OPTIONS = [
  '#ec4899', // Pink
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#6366f1', // Indigo
  '#ef4444', // Red
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#14b8a6', // Teal
  '#f97316', // Orange
  '#06b6d4', // Cyan
  '#a855f7', // Purple
  '#22c55e', // Green
];

export default function AddCategory() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const { addCategory } = useTasks();

  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('folder');
  const [selectedColor, setSelectedColor] = useState('#6366f1');
  const [showIconModal, setShowIconModal] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addCategory({ name: name.trim(), icon: selectedIcon, color: selectedColor });
    router.back();
  };

  const currentIcon = ICON_OPTIONS.find(i => i.name === selectedIcon) || ICON_OPTIONS[0];

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.navBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>New Category</Text>
        <Pressable
          onPress={handleSave}
          style={[styles.navBtn, { backgroundColor: name.trim() ? colors.primary : colors.surface, borderColor: name.trim() ? colors.primary : colors.border }]}
        >
          <Ionicons name="checkmark" size={22} color={name.trim() ? '#fff' : colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Live Preview Card */}
        <Animated.View entering={FadeInUp.springify()} style={styles.previewSection}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Preview</Text>
          <View style={[styles.previewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.previewCardInner}>
              <Animated.View entering={ZoomIn.springify()}>
                <View style={[styles.previewIconBox, { backgroundColor: selectedColor + '20' }]}>
                  <Ionicons name={selectedIcon as any} size={36} color={selectedColor} />
                </View>
              </Animated.View>
              <View>
                <Text style={[styles.previewName, { color: colors.textPrimary }]}>
                  {name || 'Category Name'}
                </Text>
                <Text style={[styles.previewCount, { color: colors.textSecondary }]}>0 Tasks</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Category Name */}
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Category Name</Text>
          <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="pricetag-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.input, { color: colors.textPrimary }]}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Health & Fitness"
              placeholderTextColor={colors.textSecondary}
              maxLength={30}
            />
            {name.length > 0 && (
              <Pressable onPress={() => setName('')}>
                <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
              </Pressable>
            )}
          </View>
        </Animated.View>

        {/* Icon Picker */}
        <Animated.View entering={FadeInUp.delay(150).springify()} style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Choose Icon</Text>
          <Pressable
            style={[styles.iconSelector, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowIconModal(true);
            }}
          >
            <View style={[styles.selectedIconBox, { backgroundColor: selectedColor + '20' }]}>
              <Ionicons name={selectedIcon as any} size={24} color={selectedColor} />
            </View>
            <Text style={[styles.iconSelectorText, { color: colors.textPrimary }]}>{currentIcon.label}</Text>
            <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
          </Pressable>
        </Animated.View>

        {/* Color Palette */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Badge Color</Text>
          <View style={[styles.colorGrid, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {COLOR_OPTIONS.map(color => (
              <Pressable
                key={color}
                style={[
                  styles.colorSwatch,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorSwatchSelected,
                ]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedColor(color);
                }}
              >
                {selectedColor === color && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </Pressable>
            ))}
          </View>
        </Animated.View>

        {/* Save Button */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <Pressable
            style={[styles.saveBtn, { backgroundColor: name.trim() ? colors.primary : colors.surface, borderColor: name.trim() ? colors.primary : colors.border }]}
            onPress={handleSave}
          >
            <Ionicons name="add-circle" size={22} color={name.trim() ? '#fff' : colors.textSecondary} />
            <Text style={[styles.saveBtnText, { color: name.trim() ? '#fff' : colors.textSecondary }]}>
              Create Category
            </Text>
          </Pressable>
        </Animated.View>

      </ScrollView>

      {/* Icon Picker Modal */}
      <Modal visible={showIconModal} transparent animationType="slide" onRequestClose={() => setShowIconModal(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalDismiss} onPress={() => setShowIconModal(false)} />
          <Animated.View entering={FadeInUp.springify()} style={[styles.modalSheet, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.modalHandle} />
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Pick an Icon</Text>
            <FlatList
              data={ICON_OPTIONS}
              numColumns={4}
              keyExtractor={item => item.name}
              contentContainerStyle={styles.iconGrid}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.iconGridItem,
                    { backgroundColor: selectedIcon === item.name ? selectedColor + '20' : colors.background, borderColor: selectedIcon === item.name ? selectedColor : colors.border },
                  ]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedIcon(item.name);
                    setShowIconModal(false);
                  }}
                >
                  <Ionicons name={item.name as any} size={28} color={selectedIcon === item.name ? selectedColor : colors.textSecondary} />
                  <Text style={[styles.iconGridLabel, { color: selectedIcon === item.name ? selectedColor : colors.textSecondary }]}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  content: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 120,
    gap: 24,
  },
  previewSection: { gap: 12 },
  previewCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },
  previewCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  previewIconBox: {
    width: 72,
    height: 72,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  previewCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: { gap: 12 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 58,
  },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
  },
  iconSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 58,
    gap: 14,
  },
  selectedIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSelectorText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  colorSwatch: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorSwatchSelected: {
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  saveBtnText: {
    fontSize: 17,
    fontWeight: '800',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalDismiss: {
    flex: 1,
  },
  modalSheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderWidth: 1,
    borderBottomWidth: 0,
    padding: 24,
    paddingBottom: 50,
    maxHeight: '65%',
  },
  modalHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(100,100,100,0.3)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 20,
  },
  iconGrid: {
    gap: 12,
  },
  iconGridItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  iconGridLabel: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
});
