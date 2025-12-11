import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import PrimaryButton from '../components/PrimaryButton';
import ChatBubble from '../components/ChatBubble';
import { useOnboarding } from '../context/OnboardingContext';

interface SummaryCardProps {
  label: string;
  value: string;
}

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <View style={cardStyles.card}>
      <Text style={cardStyles.label}>{label}</Text>
      <Text style={cardStyles.value}>{value}</Text>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: `${theme.colors.lavender}15`,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}20`,
  },
  label: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.lavender,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.softWhite,
    lineHeight: 22,
  },
});

export default function OnboardingSummaryScreen() {
  const insets = useSafeAreaInsets();
  const { arcTitle, boss, finalForm, completeOnboarding } = useOnboarding();

  const handleStartJourney = () => {
    completeOnboarding();
  };

  return (
    <View style={styles.background}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + theme.spacing.lg },
        ]}
      >
        <Text style={styles.title}>Your Story So Far</Text>

        <View style={styles.cardsContainer}>
          <SummaryCard label="Arc" value={arcTitle} />
          <SummaryCard label="Boss" value={boss} />
          <SummaryCard label="Final Form" value={finalForm} />
        </View>

        <View style={styles.chatContainer}>
          <ChatBubble
            message="Got it. I'll track this arc and help you train every day."
            sender="eva"
          />
        </View>
      </ScrollView>

      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
        <PrimaryButton
          label="Start My Journey"
          onPress={handleStartJourney}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.ink,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.xl,
  },
  cardsContainer: {
    marginBottom: theme.spacing.lg,
  },
  chatContainer: {
    marginTop: theme.spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
});
