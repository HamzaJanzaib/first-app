import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function Settings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [dataSync, setDataSync] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(value);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleNavigation = (route: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(route as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.sectionHeader}>Privacy & Data</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Cloud Sync</Text>
            <Text style={styles.settingDescription}>Sync your tasks securely to the cloud</Text>
          </View>
          <Switch 
            value={dataSync} 
            onValueChange={(val) => handleToggle(setDataSync, val)}
            trackColor={{ false: Colors.border, true: Colors.primary }}
          />
        </View>

        <View style={styles.settingRow}>
          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Usage Analytics</Text>
            <Text style={styles.settingDescription}>Help improve the app by sending anonymous data</Text>
          </View>
          <Switch 
            value={analytics} 
            onValueChange={(val) => handleToggle(setAnalytics, val)}
            trackColor={{ false: Colors.border, true: Colors.primary }}
          />
        </View>

        <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Support & Legal</Text>
        
        <Pressable style={styles.linkCard} onPress={() => handleNavigation('/profile/chat')}>
          <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="chatbubbles" size={20} color="#3B82F6" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Chat with AI Agent</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </Pressable>

        <Pressable style={styles.linkCard} onPress={() => handleNavigation('/profile/review')}>
          <View style={[styles.iconContainer, { backgroundColor: '#FEF9C3' }]}>
            <Ionicons name="star" size={20} color="#EAB308" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Leave a Review</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </Pressable>

        <Pressable style={styles.linkCard} onPress={() => handleNavigation('/profile/terms')}>
          <View style={[styles.iconContainer, { backgroundColor: '#FEF2F2' }]}>
            <Ionicons name="document-text" size={20} color="#EF4444" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Terms & Conditions</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </Pressable>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  content: {
    padding: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 16,
    marginTop: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
});
