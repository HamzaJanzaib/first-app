import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import Colors from '@/constants/color';
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

export default function Privacy() {
  const [dataSync, setDataSync] = useState(true);
  const [analytics, setAnalytics] = useState(false);

  const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setter(value);
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Privacy Settings', 
          headerShown: true,
          headerStyle: { backgroundColor: Colors.surface }, 
          headerTintColor: Colors.textPrimary 
        }} 
      />
      
      <View style={styles.content}>
        <Animated.Text entering={FadeInUp.delay(100)} style={styles.sectionHeader}>
          Data & Analytics
        </Animated.Text>
        
        <Animated.View entering={FadeInUp.delay(200).springify()} style={styles.settingRow}>
          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Cloud Sync</Text>
            <Text style={styles.settingDescription}>Sync your tasks securely to the cloud</Text>
          </View>
          <Switch 
            value={dataSync} 
            onValueChange={(val) => handleToggle(setDataSync, val)}
            trackColor={{ false: Colors.border, true: Colors.primary }}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(300).springify()} style={styles.settingRow}>
          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Usage Analytics</Text>
            <Text style={styles.settingDescription}>Help improve the app by sending anonymous usage data</Text>
          </View>
          <Switch 
            value={analytics} 
            onValueChange={(val) => handleToggle(setAnalytics, val)}
            trackColor={{ false: Colors.border, true: Colors.primary }}
          />
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
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
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
});
