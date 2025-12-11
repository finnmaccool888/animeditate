import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../theme/theme';

type CardStatus = 'active' | 'locked' | 'completed';

interface HomeCardProps {
  title: string;
  description: string;
  status: CardStatus;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

function getStatusLabel(status: CardStatus): string {
  switch (status) {
    case 'active':
      return 'Active';
    case 'locked':
      return 'Locked';
    case 'completed':
      return 'Done';
  }
}

export default function HomeCard({
  title,
  description,
  status,
  onPress,
  disabled = false,
  style,
}: HomeCardProps) {
  const isLocked = status === 'locked' || disabled;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isLocked && styles.cardLocked,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      <View style={styles.statusPillContainer}>
        <View
          style={[
            styles.statusPill,
            status === 'active' && styles.statusPillActive,
            status === 'locked' && styles.statusPillLocked,
            status === 'completed' && styles.statusPillCompleted,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              status === 'active' && styles.statusTextActive,
              status === 'locked' && styles.statusTextLocked,
              status === 'completed' && styles.statusTextCompleted,
            ]}
          >
            {getStatusLabel(status)}
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, isLocked && styles.titleLocked]}>
          {title}
        </Text>
        <Text style={[styles.description, isLocked && styles.descriptionLocked]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.ink,
    borderRadius: theme.radius,
    padding: 20,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}30`,
    shadowColor: theme.colors.lavender,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 120,
  },
  cardLocked: {
    opacity: 0.55,
    borderColor: `${theme.colors.lavender}15`,
    shadowOpacity: 0,
    elevation: 0,
  },
  statusPillContainer: {
    position: 'absolute',
    top: theme.spacing.md,
    right: theme.spacing.md,
  },
  statusPill: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm + 2,
    borderRadius: 9999,
  },
  statusPillActive: {
    backgroundColor: `${theme.colors.lavender}25`,
  },
  statusPillLocked: {
    backgroundColor: `${theme.colors.softWhite}10`,
  },
  statusPillCompleted: {
    backgroundColor: '#4CAF5025',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusTextActive: {
    color: theme.colors.lavender,
  },
  statusTextLocked: {
    color: `${theme.colors.softWhite}60`,
  },
  statusTextCompleted: {
    color: '#4CAF50',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 60,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.xs,
  },
  titleLocked: {
    color: `${theme.colors.softWhite}80`,
  },
  description: {
    fontSize: theme.fontSizes.small,
    color: `${theme.colors.softWhite}70`,
    lineHeight: 20,
  },
  descriptionLocked: {
    color: `${theme.colors.softWhite}50`,
  },
});
