import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';
import PrimaryButton from '../components/PrimaryButton';
import ChatBubble from '../components/ChatBubble';
import EvaAvatar from '../components/EvaAvatar';
import { OnboardingStackParamList } from '../navigation/OnboardingStack';

type MeetEvaScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  'MeetEva'
>;

const EVA_MESSAGES = [
  "Hi, I'm Eva — your Zen Operator.",
  "I'll help you navigate your emotional arcs and daily rituals.",
  "Let's begin your first chapter together.",
];

export default function MeetEvaScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MeetEvaScreenNavigationProp>();

  const handleContinue = () => {
    navigation.navigate('OnboardingArcTitle');
  };

  return (
    <View style={styles.background}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Meet Eva</Text>
        </View>

        <ScrollView
          style={styles.chatArea}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.messagesContainer}>
            {EVA_MESSAGES.map((message, index) => (
              <ChatBubble key={index} message={message} sender="eva" />
            ))}
          </View>

          <View style={styles.avatarContainer}>
            <EvaAvatar size={120} />
          </View>
        </ScrollView>

        <View style={[styles.buttonContainer, { paddingBottom: insets.bottom + theme.spacing.lg }]}>
          <PrimaryButton
            label="Continue"
            onPress={handleContinue}
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
    backgroundColor: theme.colors.ink,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.colors.lavender}20`,
  },
  title: {
    fontSize: theme.fontSizes.subtitle,
    fontWeight: '600',
    color: theme.colors.softWhite,
  },
  chatArea: {
    flex: 1,
  },
  chatContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  messagesContainer: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'flex-end',
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.lg,
    paddingRight: theme.spacing.md,
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  button: {
    width: '100%',
  },
});
