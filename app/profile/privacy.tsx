import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

export default function PrivacyPolicy() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} />
      
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="close" size={28} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>1. Your Privacy</Text>
        <Text style={styles.bodyText}>
          Your privacy is important to us. This policy describes how we collect, use, and protect your information when you use our Todo app.
        </Text>

        <Text style={styles.sectionTitle}>2. Information Collection</Text>
        <Text style={styles.bodyText}>
          We only collect information that you explicitly providing in our app, such as your task titles, categories, and profile details.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.bodyText}>
          All task data is stored locally on your device for maximum privacy and performance. We do not use external servers for task persistence.
        </Text>

        <Text style={styles.sectionTitle}>4. Contact Us</Text>
        <Text style={styles.bodyText}>
          If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@todoapp.com.
        </Text>
        
        <View style={styles.lastUpdate}>
          <Text style={styles.lastUpdateText}>Last Updated: April 01, 2026</Text>
        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 24,
  },
  bodyText: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  lastUpdate: {
    marginTop: 48,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  lastUpdateText: {
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
