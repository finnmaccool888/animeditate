import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../theme/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function PrimaryButton({
  label,
  onPress,
  disabled = false,
  style,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.lavender,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.lavender,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: `${theme.colors.lavender}50`,
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    color: theme.colors.softWhite,
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
  },
  labelDisabled: {
    opacity: 0.6,
  },
});
