import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Pressable, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import AttractionBackground from '@/components/AttractionBackground';
import Animated, { FadeInUp, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export default function Settings() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme, toggleTheme, colors, isDark } = useTheme();

  // Settings State
  const [dataSync, setDataSync] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [biometrics, setBiometrics] = useState(false);
  const [lowPower, setLowPower] = useState(false);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(value);
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const SettingToggle = ({ title, description, icon, value, onToggle, color }: any) => (
    <Animated.View entering={SlideInRight.springify()} style={[styles.settingCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.textStack}>
        <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{description}</Text>
      </View>
      <Switch 
        value={value} 
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={value ? '#fff' : '#f4f4f5'}
      />
    </Animated.View>
  );

  const SettingLink = ({ title, icon, color, onPress }: any) => (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        styles.linkCard,
        { borderBottomColor: colors.border + '30' },
        pressed && { backgroundColor: 'rgba(255,255,255,0.05)' }
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={[styles.linkTitle, { color: colors.textPrimary }]}>{title}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={[styles.header, { borderBottomColor: colors.border + '30' }]}>
        <Pressable onPress={handleBack} style={[styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Preferences</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <Animated.Text entering={FadeInUp.delay(100)} style={[styles.sectionHeader, { color: colors.textSecondary }]}>System & App</Animated.Text>
        
        <SettingToggle 
            title="Cloud Sync" 
            description="Automatic backup of your tasks"
            icon="cloud-upload-outline"
            color="#60A5FA"
            value={dataSync}
            onToggle={(v: boolean) => handleToggle(setDataSync, v)}
        />

        <SettingToggle 
            title="Push Notifications" 
            description="Get alerts for upcoming deadines"
            icon="notifications-outline"
            color="#FBBF24"
            value={pushNotifs}
            onToggle={(v: boolean) => handleToggle(setPushNotifs, v)}
        />

        <SettingToggle 
            title="Biometric Lock" 
            description="Use FaceID / Fingerprint"
            icon="finger-print-outline"
            color="#10B981"
            value={biometrics}
            onToggle={(v: boolean) => handleToggle(setBiometrics, v)}
        />

        <Animated.Text entering={FadeInUp.delay(300)} style={[styles.sectionHeader, { marginTop: 20, color: colors.textSecondary }]}>Interface</Animated.Text>

        <Animated.View entering={SlideInRight.delay(100).springify()} style={[styles.settingCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.iconBox, { backgroundColor: '#A78BFA15' }]}>
            <Ionicons name={isDark ? "moon-outline" : "sunny-outline"} size={20} color="#A78BFA" />
          </View>
          <View style={styles.textStack}>
            <Text style={[styles.settingTitle, { color: colors.textPrimary }]}>Dark Mode</Text>
            <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{isDark ? 'Ultra Dark Premium' : 'Clean Light Mode'}</Text>
          </View>
          <Switch 
            value={isDark} 
            onValueChange={toggleTheme}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={'#fff'}
          />
        </Animated.View>

        <SettingToggle 
            title="Low Performance Mode" 
            description="Disable heavy background animations"
            icon="flash-outline"
            color="#EC4899"
            value={lowPower}
            onToggle={(v: boolean) => handleToggle(setLowPower, v)}
        />

        <Animated.Text entering={FadeInUp.delay(500)} style={[styles.sectionHeader, { marginTop: 20, color: colors.textSecondary }]}>About & Security</Animated.Text>
        
        <View style={[styles.linkGroup, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <SettingLink 
                title="Usage Analytics" 
                icon="analytics-outline" 
                color="#6366f1" 
                onPress={() => handleToggle(setAnalytics, !analytics)} 
            />
            <SettingLink 
                title="Terms of Service" 
                icon="document-text-outline" 
                color="#94a3b8" 
                onPress={() => router.push('/profile/terms' as any)} 
            />
            <SettingLink 
                title="Privacy Control" 
                icon="shield-outline" 
                color="#10b981" 
                onPress={() => router.push('/profile/privacy' as any)} 
            />
        </View>

        <Animated.View entering={FadeInDown.delay(700).springify()} style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.textSecondary }]}>User ID: USR-9284-AXP</Text>
            <Text style={styles.footerSub}>Active Subscription: Premium Plus</Text>
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
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
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
    paddingTop: 0,
    paddingBottom: 100,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 24,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  linkGroup: {
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textStack: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 12,
  },
  linkTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSub: {
    fontSize: 11,
    color: '#F59E0B',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
