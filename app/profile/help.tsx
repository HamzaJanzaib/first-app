import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, LayoutAnimation } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import AttractionBackground from '@/components/AttractionBackground';
import * as Haptics from 'expo-haptics';

const FAQS = [
  {
    q: 'How do I create a task?',
    a: 'Tap the "+" tab in the middle of your navigation bar to open the task creation form. Fill in the title, category, date and status.',
    icon: 'add-circle-outline' as const,
    color: '#4ade80',
  },
  {
    q: 'Can I set reminders?',
    a: 'Reminders are integrated into the task creation flow. Set a time when creating a task to track it in your schedule.',
    icon: 'alarm-outline' as const,
    color: '#fbbf24',
  },
  {
    q: 'Is my data synced?',
    a: 'Currently the app stores tasks locally on your device for maximum privacy and speed. Cloud sync is coming soon!',
    icon: 'cloud-outline' as const,
    color: '#60a5fa',
  },
  {
    q: 'How do I switch dark/light mode?',
    a: 'Go to Profile → Settings and toggle the "Appearance" switch to change between Dark and Light themes instantly.',
    icon: 'contrast-outline' as const,
    color: '#a78bfa',
  },
  {
    q: 'Can I edit a task?',
    a: 'Yes! Tap any task card to open its details screen. Then tap the "Edit Task" button or the pencil icon in the header.',
    icon: 'pencil-outline' as const,
    color: '#f472b6',
  },
];

export default function HelpSupport() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { colors } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    Haptics.selectionAsync();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(prev => prev === index ? null : index);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <AttractionBackground />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <Animated.View entering={FadeInDown.springify()} style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Help & Support</Text>
        <View style={{ width: 44 }} />
      </Animated.View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Hero Banner */}
        <Animated.View entering={FadeInUp.delay(80).springify()} style={[styles.heroBanner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.heroGlow, { backgroundColor: colors.primary }]} />
          <View style={[styles.heroIconCircle, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="chatbubbles" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>How can we help?</Text>
          <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
            Browse our FAQs or reach out directly to our support team.
          </Text>
        </Animated.View>

        {/* FAQ Accordion */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Frequently Asked Questions</Text>

        {FAQS.map((faq, index) => {
          const isOpen = expandedIndex === index;
          return (
            <Animated.View
              key={index}
              entering={FadeInUp.delay(100 + index * 60).springify()}
              style={[
                styles.faqCard,
                { backgroundColor: colors.surface, borderColor: isOpen ? faq.color : colors.border }
              ]}
            >
              <Pressable style={styles.faqHeader} onPress={() => toggleFaq(index)}>
                <View style={[styles.faqIconBox, { backgroundColor: faq.color + '20' }]}>
                  <Ionicons name={faq.icon} size={20} color={faq.color} />
                </View>
                <Text style={[styles.faqQuestion, { color: colors.textPrimary }]} numberOfLines={isOpen ? undefined : 1}>
                  {faq.q}
                </Text>
                <Ionicons
                  name={isOpen ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color={isOpen ? faq.color : colors.textSecondary}
                />
              </Pressable>
              {isOpen && (
                <View style={[styles.faqAnswer, { borderTopColor: colors.border }]}>
                  <Text style={[styles.faqAnswerText, { color: colors.textSecondary }]}>{faq.a}</Text>
                </View>
              )}
            </Animated.View>
          );
        })}

        {/* Contact & Actions */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.actionsSection}>
          <Pressable
            style={[styles.contactBtn, { backgroundColor: colors.primary }]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          >
            <Ionicons name="mail" size={20} color="#fff" />
            <Text style={styles.contactBtnText}>Email Support</Text>
          </Pressable>
          <Pressable
            style={[styles.discordBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Ionicons name="logo-discord" size={20} color="#5865F2" />
            <Text style={[styles.discordBtnText, { color: colors.textPrimary }]}>Join Community</Text>
          </Pressable>
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
  content: { padding: 20, paddingBottom: 100, gap: 12 },

  heroBanner: {
    borderRadius: 28, borderWidth: 1,
    padding: 28, alignItems: 'center',
    overflow: 'hidden', position: 'relative',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08, shadowRadius: 16, elevation: 4,
  },
  heroGlow: {
    position: 'absolute', top: -30, right: -30,
    width: 100, height: 100, borderRadius: 50, opacity: 0.1,
  },
  heroIconCircle: {
    width: 90, height: 90, borderRadius: 45,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: { fontSize: 24, fontWeight: '800', marginBottom: 8 },
  heroSubtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22 },

  sectionTitle: {
    fontSize: 13, fontWeight: '700',
    textTransform: 'uppercase', letterSpacing: 0.7,
    marginBottom: 4, marginTop: 4,
  },

  faqCard: {
    borderRadius: 20, borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, gap: 14,
  },
  faqIconBox: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  faqQuestion: { flex: 1, fontSize: 15, fontWeight: '700' },
  faqAnswer: {
    paddingHorizontal: 16, paddingBottom: 16,
    borderTopWidth: 1, paddingTop: 12, marginTop: 0,
  },
  faqAnswerText: { fontSize: 14, lineHeight: 22 },

  actionsSection: { gap: 12, marginTop: 8 },
  contactBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, padding: 18, borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15, shadowRadius: 10, elevation: 5,
  },
  contactBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  discordBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, padding: 18, borderRadius: 22, borderWidth: 1,
  },
  discordBtnText: { fontSize: 16, fontWeight: '700' },
});
