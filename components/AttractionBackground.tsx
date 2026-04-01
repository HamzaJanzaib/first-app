import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  useSharedValue,
} from 'react-native-reanimated';
import Colors from '@/constants/color';

const { width, height } = Dimensions.get('window');

export default function AttractionBackground() {
  const move1 = useSharedValue(0);
  const move2 = useSharedValue(0);

  useEffect(() => {
    move1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 8000 }),
        withTiming(0, { duration: 8000 })
      ),
      -1,
      true
    );
    move2.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 12000 }),
        withTiming(0, { duration: 12000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [
      { translateX: move1.value * 100 - 50 },
      { translateY: move1.value * 200 - 100 },
    ],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [
      { translateX: move2.value * -150 + 75 },
      { translateY: move2.value * 100 - 50 },
    ],
  }));

  return (
    <View style={styles.absoluteLayer}>
      <Animated.View style={[styles.glow, styles.glow1, animatedStyle1]} />
      <Animated.View style={[styles.glow, styles.glow2, animatedStyle2]} />
      <View style={styles.darkOverlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background,
    overflow: 'hidden',
    zIndex: -1,
  },
  glow: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    opacity: 0.15,
  },
  glow1: {
    backgroundColor: Colors.primary,
    top: -100,
    left: -50,
  },
  glow2: {
    backgroundColor: '#6366f1', // Indigo glow
    bottom: -100,
    right: -50,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9, 9, 11, 0.6)', // Glass layer
  },
});
