import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface InsightCardProps {
  insights: string[];
  style?: ViewStyle;
}

export default function InsightCard({ insights, style }: InsightCardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>E</Text>
      </View>
      <View style={styles.contentContainer}>
        {insights.map((insight, index) => (
          <Text
            key={index}
            style={[
              styles.insightText,
              index < insights.length - 1 && styles.insightSpacing,
            ]}
          >
            {insight}
          </Text>
        ))}
      </View>
      <View style={styles.tailIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: `${theme.colors.lavender}15`,
    borderRadius: theme.radius,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}30`,
    shadowColor: theme.colors.lavender,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  avatarContainer: {
    position: 'absolute',
    top: -12,
    left: theme.spacing.lg,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.lavender,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.ink,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.midnight,
  },
  contentContainer: {
    marginTop: theme.spacing.sm,
  },
  insightText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.softWhite,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  insightSpacing: {
    marginBottom: theme.spacing.md,
  },
  tailIndicator: {
    position: 'absolute',
    bottom: theme.spacing.md,
    left: theme.spacing.lg + 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: `${theme.colors.lavender}40`,
  },
});
