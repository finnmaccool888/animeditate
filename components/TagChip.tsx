import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface TagChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
  style?: ViewStyle;
}

export default function TagChip({
  label,
  selected = false,
  onPress,
  style,
}: TagChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected ? styles.chipSelected : styles.chipUnselected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, selected ? styles.labelSelected : styles.labelUnselected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: theme.spacing.sm + 2,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 9999,
    borderWidth: 1.5,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  chipSelected: {
    backgroundColor: theme.colors.lavender,
    borderColor: theme.colors.lavender,
  },
  chipUnselected: {
    backgroundColor: 'transparent',
    borderColor: `${theme.colors.lavender}60`,
  },
  label: {
    fontSize: theme.fontSizes.small,
    fontWeight: '500',
  },
  labelSelected: {
    color: theme.colors.midnight,
  },
  labelUnselected: {
    color: theme.colors.softWhite,
  },
});
