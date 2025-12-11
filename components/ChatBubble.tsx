import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface ChatBubbleProps {
  message: string;
  sender?: 'eva' | 'user';
  style?: ViewStyle;
}

export default function ChatBubble({
  message,
  sender = 'eva',
  style,
}: ChatBubbleProps) {
  const isEva = sender === 'eva';

  return (
    <View
      style={[
        styles.bubble,
        isEva ? styles.evaBubble : styles.userBubble,
        style,
      ]}
    >
      <Text style={[styles.text, isEva ? styles.evaText : styles.userText]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: '85%',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius,
    marginVertical: theme.spacing.xs,
  },
  evaBubble: {
    alignSelf: 'flex-start',
    backgroundColor: `${theme.colors.lavender}30`,
    borderBottomLeftRadius: theme.spacing.xs,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.lavender,
    borderBottomRightRadius: theme.spacing.xs,
  },
  text: {
    fontSize: theme.fontSizes.body,
    lineHeight: 24,
  },
  evaText: {
    color: theme.colors.softWhite,
  },
  userText: {
    color: theme.colors.midnight,
  },
});
