import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';
import { MainAppStackParamList } from '../navigation/MainAppStack';
import { useDailyFlow } from '../context/DailyFlowContext';
import MoodIcon from '../components/MoodIcon';
import PrimaryButton from '../components/PrimaryButton';

type CheckInScreenNavigationProp = NativeStackNavigationProp<MainAppStackParamList>;

const MOODS = [
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '😰' },
  { id: 'calm', label: 'Calm', emoji: '😌' },
  { id: 'drained', label: 'Drained', emoji: '😔' },
  { id: 'motivated', label: 'Motivated', emoji: '💪' },
  { id: 'lonely', label: 'Lonely', emoji: '🥺' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🌟' },
  { id: 'anxious', label: 'Anxious', emoji: '😟' },
  { id: 'grateful', label: 'Grateful', emoji: '🙏' },
];

export default function CheckInScreen() {
  const navigation = useNavigation<CheckInScreenNavigationProp>();
  const { markCheckedIn } = useDailyFlow();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [thoughts, setThoughts] = useState('');

  const handleStartEpisode = () => {
    markCheckedIn();
    navigation.navigate('ReflectionChatScreen');
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.gradientTop} />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerSection}>
              <Text style={styles.headerLabel}>Check-In</Text>
              <Text style={styles.headerTitle}>How are you feeling today?</Text>
              <Text style={styles.headerSubtitle}>
                This sets the tone for today's episode.
              </Text>
            </View>

            <View style={styles.moodSection}>
              <View style={styles.moodGrid}>
                {MOODS.map((mood) => (
                  <MoodIcon
                    key={mood.id}
                    label={mood.label}
                    emoji={mood.emoji}
                    selected={selectedMood === mood.id}
                    onPress={() => setSelectedMood(mood.id)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Anything on your mind?</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Example: I'm tired but hopeful about today..."
                placeholderTextColor={`${theme.colors.softWhite}40`}
                multiline
                numberOfLines={4}
                value={thoughts}
                onChangeText={setThoughts}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.ctaSection}>
              <PrimaryButton
                label="Start Today's Episode"
                onPress={handleStartEpisode}
                disabled={!selectedMood}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
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
    marginBottom: theme.spacing.lg,
  },
  headerLabel: {
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
    color: theme.colors.lavender,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: theme.spacing.sm,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    fontSize: theme.fontSizes.body,
    color: `${theme.colors.softWhite}60`,
    lineHeight: 22,
  },
  moodSection: {
    marginBottom: theme.spacing.xl,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -theme.spacing.xs,
  },
  inputSection: {
    marginBottom: theme.spacing.xl,
  },
  inputLabel: {
    fontSize: theme.fontSizes.body,
    fontWeight: '600',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.sm,
  },
  textInput: {
    backgroundColor: `${theme.colors.midnight}80`,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}20`,
    padding: theme.spacing.md,
    fontSize: theme.fontSizes.body,
    color: theme.colors.softWhite,
    minHeight: 120,
    lineHeight: 22,
  },
  ctaSection: {
    alignItems: 'center',
    paddingBottom: theme.spacing.lg,
  },
});
