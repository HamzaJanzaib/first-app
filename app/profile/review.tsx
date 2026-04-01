import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Colors from '@/constants/color';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';

export default function ReviewApp() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleStarPress = (star: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setRating(star);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating first!');
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    alert('Thank you for your feedback!');
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </Pressable>
        <Text style={styles.headerTitle}>Leave a Review</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View entering={FadeInUp.delay(100).springify()} style={styles.reviewCard}>
          <Text style={styles.promptText}>How would you rate your experience?</Text>
          
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <Animated.View key={star} entering={ZoomIn.delay(200 + index * 100).springify()}>
                <Pressable onPress={() => handleStarPress(star)} style={styles.starButton}>
                  <Ionicons 
                    name={rating >= star ? 'star' : 'star-outline'} 
                    size={40} 
                    color={rating >= star ? '#F59E0B' : Colors.textSecondary} 
                  />
                </Pressable>
              </Animated.View>
            ))}
          </View>

          <Text style={styles.ratingText}>
            {rating === 0 && 'Tap a star to rate'}
            {rating === 1 && 'Terrible'}
            {rating === 2 && 'Bad'}
            {rating === 3 && 'Okay'}
            {rating === 4 && 'Good'}
            {rating === 5 && 'Excellent!'}
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).springify()} style={styles.feedbackSection}>
          <Text style={styles.labelTitle}>Tell us more (optional)</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={5}
            placeholder="What do you like or dislike?"
            placeholderTextColor={Colors.textSecondary}
            value={feedback}
            onChangeText={setFeedback}
            textAlignVertical="top"
          />
        </Animated.View>

        <Pressable 
          style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit Review</Text>
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
    padding: 24,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  promptText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginTop: 8,
  },
  feedbackSection: {
    marginBottom: 32,
  },
  labelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
