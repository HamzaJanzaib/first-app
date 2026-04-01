import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import AttractionBackground from '@/components/AttractionBackground';
import * as Haptics from 'expo-haptics';

const SECTIONS = [
  {
    number: '1',
    title: 'Your Privacy',
    icon: 'shield-checkmark-outline' as const,
    color: '#4ade80',
    text: 'Your privacy is our priority. This policy describes how we collect, use, and protect your information when you use our Todo app.',
  },
  {
    number: '2',
    title: 'Information Collection',
    icon: 'document-text-outline' as const,
    color: '#60a5fa',
    text: 'We only collect information you explicitly provide — such as task titles, categories, and profile details. No hidden tracking.',
  },
  {
    number: '3',
    title: 'Data Security',
    icon: 'lock-closed-outline' as const,
    color: '#a78bfa',
    text: 'All task data is stored locally on your device for maximum privacy and performance. We do not use external servers for task persistence.',
  },
  {
    number: '4',
    title: 'Contact Us',
    icon: 'mail-outline' as const,
    color: '#fbbf24',
    text: 'Questions about our Privacy Policy? Contact us anytime at support@todoapp.com — we respond within 24 hours.',
  },
];

export default function PrivacyPolicy() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <Animated.View entering={FadeInDown.springify()} style={styles.header}>
        <Pressable
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.back(); }}
          style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Privacy Policy</Text>
        <View style={{ width: 44 }} />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <Animated.View entering={FadeInUp.delay(80).springify()} style={[styles.heroBanner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.heroGlow, { backgroundColor: '#4ade80' }]} />
          <View style={[styles.heroIconCircle, { backgroundColor: '#4ade8020' }]}>
            <Ionicons name="shield-checkmark" size={42} color="#4ade80" />
          </View>
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>We protect your data</Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Your privacy matters. All your task data stays on your device.
          </Text>
        </Animated.View>

        {/* Policy Sections */}
        {SECTIONS.map((section, index) => (
          <Animated.View
            key={section.number}
            entering={FadeInUp.delay(120 + index * 70).springify()}
            style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconBox, { backgroundColor: section.color + '20' }]}>
                <Ionicons name={section.icon} size={20} color={section.color} />
              </View>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>{section.number}. {section.title}</Text>
            </View>
            <Text style={[styles.sectionBody, { color: colors.textSecondary }]}>{section.text}</Text>
          </Animated.View>
        ))}

        {/* Last Updated */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={[styles.footer, { borderTopColor: colors.border }]}>
          <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>Last Updated: April 01, 2026</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1,
  },
  headerTitle: { fontSize: 20, fontWeight: '800' },
  content: { padding: 20, paddingBottom: 100, gap: 14 },

  heroBanner: {
    borderRadius: 28, borderWidth: 1, padding: 28,
    alignItems: 'center', overflow: 'hidden', position: 'relative', marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08,
    shadowRadius: 16, elevation: 4,
  },
  heroGlow: {
    position: 'absolute', top: -30, right: -30,
    width: 100, height: 100, borderRadius: 50, opacity: 0.1,
  },
  heroIconCircle: {
    width: 88, height: 88, borderRadius: 44,
    justifyContent: 'center', alignItems: 'center', marginBottom: 18,
  },
  heroTitle: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  heroSubtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22 },

  sectionCard: {
    borderRadius: 22, borderWidth: 1, padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05,
    shadowRadius: 8, elevation: 2,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
  sectionIconBox: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  sectionBody: { fontSize: 14, lineHeight: 22 },

  footer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, paddingTop: 20, borderTopWidth: 1, marginTop: 10,
  },
  footerText: { fontSize: 13 },
});
