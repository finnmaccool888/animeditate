import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';
import PrimaryButton from '../components/PrimaryButton';
import { OnboardingStackParamList } from '../navigation/OnboardingStack';

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'Welcome'
>;

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleBegin = () => {
    navigation.navigate('MeetEva');
  };

  return (
    <View style={styles.background}>
      <View style={styles.gradientOverlay} />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.content}>
          <Text style={styles.title}>Animeditate</Text>
          <Text style={styles.subtitle}>
            Your emotional journey begins here.
          </Text>
          <Text style={styles.description}>
            Meet Eva — your anime guide to daily calm and clarity.
          </Text>
        </View>

        <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
          <PrimaryButton
            label="Begin"
            onPress={handleBegin}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.midnight,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.lavender,
    opacity: 0.15,
  },
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSizes.subtitle,
    fontWeight: '500',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    opacity: 0.9,
  },
  description: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.softWhite,
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: theme.spacing.lg,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
});
