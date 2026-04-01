import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const Profile = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Pressable onPress={() => handlePress('/profile/settings')} style={styles.settingsBtn}>
            <Ionicons name="settings-outline" size={24} color={Colors.textPrimary} />
          </Pressable>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }} 
              style={styles.avatar} 
            />
            <Pressable style={styles.cameraBtn} onPress={() => handlePress('/profile/edit')}>
              <Ionicons name="camera" size={16} color="#fff" />
            </Pressable>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          
          <Pressable style={styles.editBtn} onPress={() => handlePress('/profile/edit')}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.menuSection}>
          <Pressable style={styles.menuItem} onPress={() => handlePress('/profile/categories')}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#FDF2F8' }]}>
              <Ionicons name="folder" size={22} color="#9d174d" />
            </View>
            <Text style={styles.menuItemText}>Categories</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => handlePress('/profile/help')}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="help-circle" size={22} color="#1d4ed8" />
            </View>
            <Text style={styles.menuItemText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => handlePress('/profile/privacy')}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="shield-checkmark" size={22} color="#15803d" />
            </View>
            <Text style={styles.menuItemText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => handlePress('/profile/terms')}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#FFF7ED' }]}>
              <Ionicons name="document-text" size={22} color="#c2410c" />
            </View>
            <Text style={styles.menuItemText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>

          <Pressable style={styles.menuItem} onPress={() => handlePress('/profile/settings')}>
            <View style={[styles.menuIconContainer, { backgroundColor: '#F8FAFC' }]}>
              <Ionicons name="settings" size={22} color="#475569" />
            </View>
            <Text style={styles.menuItemText}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  settingsBtn: {
    padding: 8,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  editBtn: {
    backgroundColor: Colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editBtnText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
