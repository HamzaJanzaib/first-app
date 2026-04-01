import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Image, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AttractionBackground from '@/components/AttractionBackground';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export default function EditProfile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useTheme();

  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@tasks.io');
  const [phone, setPhone] = useState('+1 234 567 8900');
  const [bio, setBio] = useState('Passionate about digital product design and productivity workflows.');

  const handleSave = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  };

  const EditInput = ({ label, value, onChange, icon, keyboardType = 'default' as any, multiline = false }: any) => (
    <Animated.View entering={SlideInRight.springify()} style={styles.inputGroup}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name={icon} size={18} color={colors.textSecondary} style={styles.inputIcon} />
        <TextInput 
          style={[styles.input, { color: colors.textPrimary, height: multiline ? 100 : 'auto' }]} 
          value={value} 
          onChangeText={onChange} 
          keyboardType={keyboardType}
          placeholderTextColor={colors.textSecondary}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Edit Account</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Fixed Avatar Section */}
        <Animated.View entering={FadeInUp.springify()} style={styles.avatarContainer}>
            <View style={styles.avatarFrame}>
                <View style={[styles.avatarGlow, { shadowColor: colors.primary, borderColor: colors.primary }]} />
                <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' }} 
                    style={[styles.avatar, { backgroundColor: colors.surface }]} 
                />
                <Pressable style={[styles.cameraBtn, { backgroundColor: colors.primary, borderColor: colors.backgroundColor || colors.background }]}>
                    <Ionicons name="camera" size={20} color="#fff" />
                </Pressable>
            </View>
            <Text style={[styles.avatarLabel, { color: colors.textSecondary }]}>Upload New Picture</Text>
        </Animated.View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
            <EditInput 
                label="Full Name" 
                value={name} 
                onChange={setName} 
                icon="person-outline" 
            />
            <EditInput 
                label="Email Address" 
                value={email} 
                onChange={setEmail} 
                icon="mail-outline" 
                keyboardType="email-address" 
            />
            <EditInput 
                label="Phone Number" 
                value={phone} 
                onChange={setPhone} 
                icon="call-outline" 
                keyboardType="phone-pad" 
            />
        </View>

        <Animated.View entering={FadeInDown.delay(400).springify()}>
            <Pressable style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Synchronize Profile</Text>
            </Pressable>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  content: {
    padding: 24,
    paddingTop: 10,
    paddingBottom: 80, // Reduced padding as we have fewer items
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarFrame: {
    width: 120,
    height: 120,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    elevation: 12,
    zIndex: 10,
  },
  avatarLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 16,
  },
  formContainer: {
    gap: 20,
    marginBottom: 32,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    minHeight: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 12,
  },
  saveBtn: {
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  deleteBtn: {
    marginTop: 24,
    padding: 12,
    alignItems: 'center',
  },
  deleteText: {
    color: '#f87171',
    fontWeight: '700',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
