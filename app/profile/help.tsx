import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function HelpCenter() {
  const handlePress = (url: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would open a browser or mail client
    // Linking.openURL(url);
    alert(`Navigating to ${url}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Help Center', 
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface }, 
          headerTintColor: Colors.textPrimary 
        }} 
      />
      
      <View style={styles.content}>
        <Animated.View entering={FadeInLeft.delay(100).springify()}>
          <Pressable style={styles.helpCard} onPress={() => handlePress('mailto:support@example.com')}>
            <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="mail" size={24} color="#3B82F6" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Contact Support</Text>
              <Text style={styles.cardSubtitle}>Email us your issues</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInLeft.delay(200).springify()}>
          <Pressable style={styles.helpCard} onPress={() => handlePress('https://example.com/faq')}>
            <View style={[styles.iconContainer, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="help-buoy" size={24} color="#22C55E" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>FAQs</Text>
              <Text style={styles.cardSubtitle}>Find answers to common questions</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInLeft.delay(300).springify()}>
          <Pressable style={styles.helpCard} onPress={() => handlePress('https://example.com/terms')}>
            <View style={[styles.iconContainer, { backgroundColor: '#FEF2F2' }]}>
              <Ionicons name="document-text" size={24} color="#EF4444" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Terms of Service</Text>
              <Text style={styles.cardSubtitle}>Read our terms and conditions</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </Pressable>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
