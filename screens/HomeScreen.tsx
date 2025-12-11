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
import HomeCard from '../components/HomeCard';
import { MainAppStackParamList } from '../navigation/MainAppStack';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainAppStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { arcTitle, boss } = useOnboarding();

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.gradientTop} />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.headerTitle}>Today's Episode</Text>
            <Text style={styles.headerArc}>Arc: {arcTitle || 'Your Journey'}</Text>
            <Text style={styles.headerBoss}>Boss: {boss || 'Unknown'}</Text>
          </View>

          <View style={styles.cardsSection}>
            <HomeCard
              title="Check-In"
              description="Acknowledge the start of today's episode."
              status="active"
              onPress={() => navigation.navigate('CheckInScreen')}
            />

            <HomeCard
              title="Reflect With Eva"
              description="Talk to Eva about what's happening internally."
              status="locked"
              onPress={() => navigation.navigate('ReflectionChatScreen')}
            />

            <HomeCard
              title="Zen Quest"
              description="Your daily meditation quest to strengthen your Final Form."
              status="locked"
              onPress={() => navigation.navigate('ZenQuestScreen')}
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
    height: 200,
    backgroundColor: theme.colors.midnight,
    opacity: 0.7,
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
  },
  headerSection: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.sm,
  },
  headerArc: {
    fontSize: theme.fontSizes.subtitle,
    fontWeight: '500',
    color: theme.colors.lavender,
    marginBottom: theme.spacing.xs,
  },
  headerBoss: {
    fontSize: theme.fontSizes.small,
    color: `${theme.colors.softWhite}60`,
  },
  cardsSection: {
    marginTop: theme.spacing.md,
  },
});
