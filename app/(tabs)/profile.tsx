import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import AttractionBackground from '@/components/AttractionBackground';

const { width } = Dimensions.get('window');

const Profile = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const MENU_ITEMS = [
    { title: 'Categories', icon: 'folder-outline' as const, color: '#ec4899', href: '/profile/categories' },
    { title: 'Help & Support', icon: 'help-buoy-outline' as const, color: '#6366f1', href: '/profile/help' },
    { title: 'Privacy Policy', icon: 'shield-checkmark-outline' as const, color: '#10b981', href: '/profile/privacy' },
    { title: 'Terms & Conditions', icon: 'document-text-outline' as const, color: '#f59e0b', href: '/profile/terms' },
    { title: 'Settings', icon: 'settings-outline' as const, color: '#64748b', href: '/profile/settings' },
    { title: 'Chat AI Agent', icon: 'chatbubble-ellipses-outline' as const, color: Colors.primary, href: '/profile/chat' },
  ];

  const handlePress = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header with Glow */}
        <Animated.View entering={FadeInUp.springify()} style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarGlow} />
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop' }} 
              style={styles.avatar} 
            />
            <Pressable style={styles.cameraBtn} onPress={() => handlePress('/profile/edit')}>
              <Ionicons name="camera" size={16} color="#fff" />
            </Pressable>
          </View>
          
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@tasks.io</Text>
          
          <View style={styles.badgeContainer}>
            <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Active Now</Text>
            </View>
            <View style={styles.levelBadge}>
                <Text style={styles.levelText}>GOAL CRUSHER</Text>
            </View>
          </View>
        </Animated.View>

        {/* Action Menu with Premium Shadow */}
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.menuContainer}>
           <View style={styles.menuGlow} />
           {MENU_ITEMS.map((item, index) => (
             <Pressable 
                key={item.title} 
                onPress={() => handlePress(item.href)}
                style={({ pressed }) => [
                    styles.menuItem,
                    pressed && { backgroundColor: 'rgba(255,255,255,0.05)' },
                    index === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 }
                ]}
             >
                <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                   <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <View style={styles.menuTextContent}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle}>Manage your {item.title.toLowerCase()}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
             </Pressable>
           ))}
        </Animated.View>

        {/* Logout/Footer */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
            <Pressable style={styles.logoutBtn}>
                <Ionicons name="log-out-outline" size={20} color="#f87171" />
                <Text style={styles.logoutText}>Sign Out Account</Text>
            </Pressable>
            <Text style={styles.footerInfo}>Mobile App v1.0.4.premium</Text>
        </Animated.View>
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
    paddingBottom: 140,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 24,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 20,
    padding: 2,
  },
  avatarGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.surface,
  },
  cameraBtn: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: Colors.primary,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.background,
    elevation: 8,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(74, 222, 128, 0.3)',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ade80',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4ade80',
    textTransform: 'uppercase',
  },
  levelBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  levelText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  menuContainer: {
    backgroundColor: Colors.surface,
    marginHorizontal: 24,
    borderRadius: 36,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  menuGlow: {
    position: 'absolute',
    bottom: -50,
    right: -50,
    width: 150,
    height: 150,
    backgroundColor: Colors.primary,
    opacity: 0.03,
    borderRadius: 75,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.03)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginTop: 40,
    padding: 18,
    borderRadius: 24,
    backgroundColor: 'rgba(248, 113, 113, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(248, 113, 113, 0.2)',
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f87171',
  },
  footerInfo: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: Colors.textSecondary,
    opacity: 0.5,
  },
});
