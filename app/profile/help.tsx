import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function HelpSupport() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const FAQS = [
    { q: 'How do I create a task?', a: 'Tap the "+" tab in the middle of your navigation bar to start creating.' },
    { q: 'Can I set reminders?', a: 'Reminders are currently integrated into the task creation flow under times.' },
    { q: 'Is my data synced?', a: 'Currently, the app stores data locally for privacy and speed.' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} />
      
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="close" size={28} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.illustrationContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="chatbubbles" size={40} color={Colors.primary} />
          </View>
          <Text style={styles.title}>How can we help?</Text>
          <Text style={styles.subtitle}>Check our FAQs or get in touch with our team.</Text>
        </View>

        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.faqList}>
          {FAQS.map((faq, i) => (
            <View key={i} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
              <Text style={styles.faqAnswer}>{faq.a}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.contactBtn} 
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <Ionicons name="mail" size={20} color="#fff" />
          <Text style={styles.contactBtnText}>Contact Support</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  content: {
    padding: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primaryMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },
  faqList: {
    gap: 20,
    marginBottom: 40,
  },
  faqItem: {
    backgroundColor: Colors.surface,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  contactBtn: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 20,
    gap: 12,
  },
  contactBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
