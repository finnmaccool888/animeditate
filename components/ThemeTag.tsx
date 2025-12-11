import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface ThemeTagProps {
  label: string;
  style?: ViewStyle;
}

export default function ThemeTag({ label, style }: ThemeTagProps) {
  return (
    <View style={[styles.tag, style]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    backgroundColor: `${theme.colors.lavender}25`,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 9999,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}40`,
  },
  label: {
    fontSize: theme.fontSizes.small,
    fontWeight: '500',
    color: theme.colors.softWhite,
  },
});
