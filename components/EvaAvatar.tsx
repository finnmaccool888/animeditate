import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface EvaAvatarProps {
  size?: number;
  style?: ViewStyle;
}

export default function EvaAvatar({ size = 100, style }: EvaAvatarProps) {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.innerCircle,
          {
            width: size - 8,
            height: size - 8,
            borderRadius: (size - 8) / 2,
          },
        ]}
      >
        <Text style={[styles.initial, { fontSize: size * 0.4 }]}>E</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.lavender,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  innerCircle: {
    backgroundColor: theme.colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    color: theme.colors.lavender,
    fontWeight: '700',
  },
});
