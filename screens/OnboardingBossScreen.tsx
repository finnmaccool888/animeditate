import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';
import PrimaryButton from '../components/PrimaryButton';
import TagChip from '../components/TagChip';
import { useOnboarding } from '../context/OnboardingContext';
import { OnboardingStackParamList } from '../navigation/OnboardingStack';

type NavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'OnboardingBoss'
>;

const BOSS_OPTIONS = [
  'Stress',
  'Motivation',
  'Sleep',
  'Confidence',
  'Loneliness',
  'Overthinking',
  'Other',
];

export default function OnboardingBossScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { setBoss } = useOnboarding();
  const [selectedBoss, setSelectedBoss] = useState<string | null>(null);
  const [customBoss, setCustomBoss] = useState('');

  const handleNext = () => {
    const bossValue = selectedBoss === 'Other' ? customBoss.trim() : selectedBoss;
    if (bossValue) {
      setBoss(bossValue);
      navigation.navigate('OnboardingFinalForm');
    }
  };

  const isOtherSelected = selectedBoss === 'Other';
  const isValid = selectedBoss !== null && (!isOtherSelected || customBoss.trim().length > 0);

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + theme.spacing.lg },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.title}>Your Current Boss</Text>
            <Text style={styles.subtitle}>
              What are you battling most right now?
            </Text>

            <View style={styles.chipsContainer}>
              {BOSS_OPTIONS.map((option) => (
                <TagChip
                  key={option}
                  label={option}
                  selected={selectedBoss === option}
                  onPress={() => setSelectedBoss(option)}
                />
              ))}
            </View>

            {isOtherSelected && (
              <TextInput
                style={styles.input}
                placeholder="Describe your challenge…"
                placeholderTextColor={`${theme.colors.softWhite}50`}
                value={customBoss}
                onChangeText={setCustomBoss}
                multiline
                textAlignVertical="top"
                autoFocus
              />
            )}
          </View>
        </ScrollView>

        <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
          <PrimaryButton
            label="Next"
            onPress={handleNext}
            disabled={!isValid}
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.colors.ink,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizes.title,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.softWhite,
    opacity: 0.8,
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: theme.spacing.lg,
  },
  input: {
    backgroundColor: `${theme.colors.lavender}15`,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    fontSize: theme.fontSizes.body,
    color: theme.colors.softWhite,
    minHeight: 100,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}30`,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
});
