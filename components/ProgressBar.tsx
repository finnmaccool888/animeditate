import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  style?: ViewStyle;
}

export default function ProgressBar({ progress, label, style }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${clampedProgress}%` }]} />
        <View style={styles.glowOverlay} />
      </View>
      <Text style={styles.percentageText}>{clampedProgress}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.sm,
    fontWeight: '500',
  },
  track: {
    height: 12,
    backgroundColor: theme.colors.midnight,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}20`,
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.lavender,
    borderRadius: 6,
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: `${theme.colors.softWhite}10`,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  percentageText: {
    fontSize: theme.fontSizes.caption,
    color: `${theme.colors.softWhite}70`,
    marginTop: theme.spacing.xs,
    textAlign: 'right',
  },
});
