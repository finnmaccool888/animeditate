import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ViewStyle, Animated } from 'react-native';
import { theme } from '../theme/theme';

interface ChatBubbleProps {
  message: string;
  sender?: 'eva' | 'user';
  style?: ViewStyle;
  isTyping?: boolean;
}

/**
 * Animated typing dots component for Eva's thinking state
 */
function TypingIndicator() {
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animation1 = animateDot(dot1Opacity, 0);
    const animation2 = animateDot(dot2Opacity, 150);
    const animation3 = animateDot(dot3Opacity, 300);

    animation1.start();
    animation2.start();
    animation3.start();

    return () => {
      animation1.stop();
      animation2.stop();
      animation3.stop();
    };
  }, [dot1Opacity, dot2Opacity, dot3Opacity]);

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.typingDot, { opacity: dot1Opacity }]} />
      <Animated.View style={[styles.typingDot, { opacity: dot2Opacity }]} />
      <Animated.View style={[styles.typingDot, { opacity: dot3Opacity }]} />
    </View>
  );
}

export default function ChatBubble({
  message,
  sender = 'eva',
  style,
  isTyping = false,
}: ChatBubbleProps) {
  const isEva = sender === 'eva';

  // Render typing indicator for Eva
  if (isTyping && isEva) {
    return (
      <View
        style={[
          styles.bubble,
          styles.evaBubble,
          styles.typingBubble,
          style,
        ]}
      >
        <TypingIndicator />
      </View>
    );
  }

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
  typingBubble: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minWidth: 70,
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
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.lavender,
    marginHorizontal: 3,
  },
});
