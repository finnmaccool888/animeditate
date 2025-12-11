import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface MoodIconProps {
  label: string;
  emoji: string;
  selected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function MoodIcon({
  label,
  emoji,
  selected = false,
  onPress,
  style,
}: MoodIconProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        selected ? styles.containerSelected : styles.containerUnselected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text
        style={[
          styles.label,
          selected ? styles.labelSelected : styles.labelUnselected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.radius,
    borderWidth: 1.5,
    minWidth: 80,
    margin: theme.spacing.xs,
  },
  containerSelected: {
    backgroundColor: `${theme.colors.lavender}25`,
    borderColor: theme.colors.lavender,
  },
  containerUnselected: {
    backgroundColor: 'transparent',
    borderColor: `${theme.colors.lavender}30`,
  },
  emoji: {
    fontSize: 28,
    marginBottom: theme.spacing.xs,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  labelSelected: {
    color: theme.colors.lavender,
  },
  labelUnselected: {
    color: `${theme.colors.softWhite}70`,
  },
});
