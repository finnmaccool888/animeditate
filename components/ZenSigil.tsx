import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme/theme';

interface ZenSigilProps {
  size?: number;
}

export default function ZenSigil({ size = 180 }: ZenSigilProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    const glowAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.7,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.4,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    pulseAnimation.start();
    glowAnimation.start();

    return () => {
      pulseAnimation.stop();
      glowAnimation.stop();
    };
  }, [pulseAnim, glowAnim]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.outerGlow,
          {
            width: size + 40,
            height: size + 40,
            borderRadius: (size + 40) / 2,
            opacity: glowAnim,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.sigil,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      >
        <View style={[styles.innerRing, { width: size * 0.7, height: size * 0.7, borderRadius: (size * 0.7) / 2 }]} />
        <View style={[styles.core, { width: size * 0.35, height: size * 0.35, borderRadius: (size * 0.35) / 2 }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerGlow: {
    position: 'absolute',
    backgroundColor: theme.colors.lavender,
  },
  sigil: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${theme.colors.lavender}15`,
    borderWidth: 2,
    borderColor: theme.colors.lavender,
    shadowColor: theme.colors.lavender,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  innerRing: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}60`,
    backgroundColor: 'transparent',
  },
  core: {
    backgroundColor: `${theme.colors.lavender}30`,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}80`,
  },
});
