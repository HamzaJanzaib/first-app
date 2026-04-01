import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence 
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

export default function AttractionBackground() {
  const { colors, isDark } = useTheme();
  const move1 = useSharedValue(0);
  const move2 = useSharedValue(0);
  const rotation = useSharedValue(0);

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
    rotation.value = withRepeat(
      withTiming(360, { duration: 25000 }),
      -1,
      false
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

  const textureStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={[styles.absoluteLayer, { backgroundColor: colors.background }]}>
      {/* Mesh Glows */}
      <Animated.View style={[styles.glow, styles.glow1, animatedStyle1, { backgroundColor: colors.primary, opacity: isDark ? 0.12 : 0.08 }]} />
      <Animated.View style={[styles.glow, styles.glow2, animatedStyle2, { backgroundColor: isDark ? '#6366f1' : '#3b82f6', opacity: isDark ? 0.12 : 0.08 }]} />

      {/* Top Left Texture Animation */}
      <Animated.View style={[styles.textureContainer, textureStyle, { opacity: isDark ? 0.2 : 0.1 }]}>
         <View style={[styles.textureShape1, { borderColor: colors.primary }]} />
         <View style={[styles.textureShape2, { borderColor: isDark ? '#6366f1' : '#3b82f6' }]} />
      </Animated.View>

      <View style={[styles.darkOverlay, { backgroundColor: isDark ? 'rgba(9, 9, 11, 0.7)' : 'rgba(255, 255, 255, 0.1)' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -1,
  },
  glow: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
  },
  glow1: {
    top: -100,
    left: -50,
  },
  glow2: {
    bottom: -100,
    right: -50,
  },
  textureContainer: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textureShape1: {
    width: 140,
    height: 140,
    borderRadius: 30,
    borderWidth: 2,
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
  },
  textureShape2: {
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 1,
    position: 'absolute',
    transform: [{ rotate: '-15deg' }],
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
});
