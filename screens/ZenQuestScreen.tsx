import React, { useMemo } from 'react';
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
import {
  generateZenQuestMeditation,
  parseMeditationLines,
  MeditationParams,
} from '../services/evaPlaceholder';

type ZenQuestScreenNavigationProp = NativeStackNavigationProp<MainAppStackParamList>;

export default function ZenQuestScreen() {
  const navigation = useNavigation<ZenQuestScreenNavigationProp>();
  const { arcTitle, boss, finalForm } = useOnboarding();
  const { markCompletedZenQuest } = useDailyFlow();

  // Build meditation params from onboarding values
  // TODO: Get mood from CheckInScreen when persistence is added
  const meditationParams: MeditationParams = useMemo(() => ({
    arcTitle: arcTitle || 'Your Journey',
    boss: boss || 'your challenge',
    finalForm: finalForm || 'your true self',
    mood: 'steady', // Placeholder until mood storage is implemented
  }), [arcTitle, boss, finalForm]);

  // Generate personalized meditation using placeholder AI
  const meditationScript = useMemo(
    () => generateZenQuestMeditation(meditationParams),
    [meditationParams]
  );

  // Parse into lines for display
  const meditationLines = useMemo(
    () => parseMeditationLines(meditationScript),
    [meditationScript]
  );

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
            {meditationLines.map((line, index) => {
              // Check if line contains arc title (highlight it)
              const isHighlight = line.includes(arcTitle) ||
                                  line.toLowerCase().includes('your arc') ||
                                  line.toLowerCase().includes('remember');

              return (
                <Text
                  key={index}
                  style={[
                    styles.meditationText,
                    isHighlight && styles.meditationTextHighlight,
                  ]}
                >
                  {line}
                </Text>
              );
            })}
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
    lineHeight: 32,
    marginBottom: theme.spacing.xs,
  },
  meditationTextHighlight: {
    color: theme.colors.lavender,
    fontWeight: '500',
  },
  ctaSection: {
    alignItems: 'center',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
  },
});
