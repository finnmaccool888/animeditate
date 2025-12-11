import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';
import { useOnboarding } from '../context/OnboardingContext';
import { useDailyFlow } from '../context/DailyFlowContext';
import { MainAppStackParamList } from '../navigation/MainAppStack';
import ZenSigil from '../components/ZenSigil';
import PrimaryButton from '../components/PrimaryButton';

type ZenQuestScreenNavigationProp = NativeStackNavigationProp<MainAppStackParamList>;

export default function ZenQuestScreen() {
  const navigation = useNavigation<ZenQuestScreenNavigationProp>();
  const { arcTitle, boss, finalForm } = useOnboarding();
  const { markCompletedZenQuest } = useDailyFlow();

  const handleComplete = () => {
    markCompletedZenQuest();
    navigation.navigate('MainTabs');
  };

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
          <View style={styles.headerSection}>
            <Text style={styles.headerLabel}>Zen Quest</Text>
            <Text style={styles.headerTitle}>Your Inner Mission For Today</Text>
            <Text style={styles.headerSubtitle}>
              Eva has prepared today's meditation quest for you.
            </Text>
          </View>

          <View style={styles.sigilSection}>
            <ZenSigil size={160} />
          </View>

          <View style={styles.meditationSection}>
            <Text style={styles.meditationText}>Close your eyes.</Text>
            <Text style={styles.meditationText}>Inhale slowly for 4 counts.</Text>
            <Text style={styles.meditationText}>Hold for 2 counts.</Text>
            <Text style={styles.meditationText}>Exhale for 6 counts.</Text>
            <View style={styles.meditationSpacer} />
            <Text style={styles.meditationTextHighlight}>
              Remember your arc: {arcTitle || 'Your Journey'}.
            </Text>
            <Text style={styles.meditationText}>
              Today, release 1% of the weight from {boss || 'your current challenge'}.
            </Text>
            <Text style={styles.meditationText}>
              Move one small step toward {finalForm || 'your final form'}.
            </Text>
          </View>

          <View style={styles.ctaSection}>
            <PrimaryButton
              label="Complete Zen Quest"
              onPress={handleComplete}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: theme.colors.ink,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: theme.colors.midnight,
    opacity: 0.8,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
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
    paddingBottom: theme.spacing.xxl,
    alignItems: 'center',
  },
  headerSection: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  headerLabel: {
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
    color: theme.colors.lavender,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: theme.fontSizes.body,
    color: `${theme.colors.softWhite}60`,
    textAlign: 'center',
    lineHeight: 22,
  },
  sigilSection: {
    marginVertical: theme.spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meditationSection: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
  },
  meditationText: {
    fontSize: theme.fontSizes.body,
    color: `${theme.colors.softWhite}85`,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: theme.spacing.xs,
  },
  meditationTextHighlight: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.lavender,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: theme.spacing.xs,
    fontWeight: '500',
  },
  meditationSpacer: {
    height: theme.spacing.lg,
  },
  ctaSection: {
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
});
