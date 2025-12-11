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
import { useOnboarding } from '../context/OnboardingContext';
import { OnboardingStackParamList } from '../navigation/OnboardingStack';

type NavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'OnboardingFinalForm'
>;

export default function OnboardingFinalFormScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { setFinalForm } = useOnboarding();
  const [form, setForm] = useState('');

  const handleContinue = () => {
    setFinalForm(form.trim());
    navigation.navigate('OnboardingSummary');
  };

  const isValid = form.trim().length > 0;

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
            <Text style={styles.title}>Your Final Form</Text>
            <Text style={styles.subtitle}>
              What kind of person are you trying to become?
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Example: Calm, confident, and in control of my life."
              placeholderTextColor={`${theme.colors.softWhite}50`}
              value={form}
              onChangeText={setForm}
              multiline
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
          <PrimaryButton
            label="Continue"
            onPress={handleContinue}
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
  input: {
    backgroundColor: `${theme.colors.lavender}15`,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    fontSize: theme.fontSizes.body,
    color: theme.colors.softWhite,
    minHeight: 120,
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
