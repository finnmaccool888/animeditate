import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme/theme';
import { useOnboarding } from '../context/OnboardingContext';
import ThemeTag from '../components/ThemeTag';
import InsightCard from '../components/InsightCard';
import ProgressBar from '../components/ProgressBar';
import MoodGraphPlaceholder from '../components/MoodGraphPlaceholder';

interface Episode {
  number: number;
  title: string;
  mood: string;
}

const PLACEHOLDER_EPISODES: Episode[] = [
  { number: 1, title: 'Rising Resolve', mood: '🙂' },
  { number: 2, title: 'Shadows of Stress', mood: '😰' },
  { number: 3, title: 'Quiet Progress', mood: '😌' },
  { number: 4, title: 'The Inner Storm', mood: '😤' },
  { number: 5, title: 'Small Steps Forward', mood: '🌱' },
];

const RECURRING_THEMES = [
  'stress',
  'confidence',
  'overthinking',
  'energy',
  'motivation',
];

const EVA_INSIGHTS = [
  "Your emotional field shows growing stability.",
  "Stay attentive to patterns of overwhelm.",
  "Your journey is unfolding in the right direction.",
];

const PLACEHOLDER_PROGRESS = 42;

export default function SagaScreen() {
  const { arcTitle, boss, finalForm } = useOnboarding();

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Saga</Text>
            <Text style={styles.headerSubtitle}>Your season's journey</Text>
            {arcTitle && (
              <Text style={styles.arcLabel}>Arc: {arcTitle}</Text>
            )}
          </View>

          {/* Weekly Episode Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Weekly Episode Summary</Text>
            <View style={styles.episodeCard}>
              {PLACEHOLDER_EPISODES.map((episode) => (
                <View key={episode.number} style={styles.episodeRow}>
                  <Text style={styles.episodeNumber}>Ep {episode.number}</Text>
                  <Text style={styles.episodeTitle}>{episode.title}</Text>
                  <Text style={styles.episodeMood}>{episode.mood}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Mood Graph */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mood Trend</Text>
            <View style={styles.graphCard}>
              <MoodGraphPlaceholder />
            </View>
          </View>

          {/* Recurring Themes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recurring Themes</Text>
            <View style={styles.themesContainer}>
              {RECURRING_THEMES.map((themeName) => (
                <ThemeTag key={themeName} label={themeName} />
              ))}
            </View>
          </View>

          {/* Eva's Insights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Eva's Insights</Text>
            <InsightCard insights={EVA_INSIGHTS} style={styles.insightCardSpacing} />
          </View>

          {/* Progress Toward Final Form */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Final Form Progress</Text>
            <View style={styles.progressCard}>
              <Text style={styles.finalFormLabel}>
                Becoming: {finalForm || 'Your True Self'}
              </Text>
              {boss && (
                <Text style={styles.bossLabel}>Boss: {boss}</Text>
              )}
              <ProgressBar
                progress={PLACEHOLDER_PROGRESS}
                label={`Progress toward ${finalForm || 'Your True Self'}`}
                style={styles.progressBarSpacing}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: theme.colors.midnight,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: theme.colors.ink,
    opacity: 0.6,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: `${theme.colors.lavender}08`,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl + 20,
  },
  headerSection: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSizes.subtitle,
    fontWeight: '400',
    color: `${theme.colors.softWhite}70`,
    marginBottom: theme.spacing.sm,
  },
  arcLabel: {
    fontSize: theme.fontSizes.small,
    fontWeight: '500',
    color: theme.colors.lavender,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  episodeCard: {
    backgroundColor: theme.colors.ink,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}20`,
  },
  episodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.colors.lavender}10`,
  },
  episodeNumber: {
    fontSize: theme.fontSizes.caption,
    fontWeight: '600',
    color: theme.colors.lavender,
    width: 45,
  },
  episodeTitle: {
    flex: 1,
    fontSize: theme.fontSizes.small,
    color: theme.colors.softWhite,
  },
  episodeMood: {
    fontSize: 18,
    marginLeft: theme.spacing.sm,
  },
  graphCard: {
    backgroundColor: theme.colors.ink,
    borderRadius: theme.radius,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}20`,
  },
  themesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  insightCardSpacing: {
    marginTop: theme.spacing.sm,
  },
  progressCard: {
    backgroundColor: theme.colors.ink,
    borderRadius: theme.radius,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}20`,
  },
  finalFormLabel: {
    fontSize: theme.fontSizes.subtitle,
    fontWeight: '600',
    color: theme.colors.lavender,
    marginBottom: theme.spacing.xs,
  },
  bossLabel: {
    fontSize: theme.fontSizes.small,
    color: `${theme.colors.softWhite}60`,
    marginBottom: theme.spacing.lg,
  },
  progressBarSpacing: {
    marginTop: theme.spacing.sm,
  },
});
