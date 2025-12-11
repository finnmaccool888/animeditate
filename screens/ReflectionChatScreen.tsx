import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme/theme';
import { MainAppStackParamList } from '../navigation/MainAppStack';
import ChatBubble from '../components/ChatBubble';

type ReflectionChatScreenNavigationProp = NativeStackNavigationProp<MainAppStackParamList>;

interface Message {
  id: string;
  role: 'eva' | 'user';
  text: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'eva',
    text: 'I saw how you checked in. Thank you for being honest.',
  },
  {
    id: '2',
    role: 'eva',
    text: "What's one thing that's been weighing on you lately?",
  },
];

const CANNED_EVA_RESPONSES = [
  "That sounds heavy. What part of that feels most intense?",
  "I hear you. Sometimes just naming it helps. What else is there?",
  "You're doing well by sharing this. How does it feel to say it out loud?",
  "That makes sense. What would feel like a small step forward?",
];

export default function ReflectionChatScreen() {
  const navigation = useNavigation<ReflectionChatScreenNavigationProp>();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const responseIndexRef = useRef(0);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText.trim(),
    };

    const evaResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'eva',
      text: CANNED_EVA_RESPONSES[responseIndexRef.current % CANNED_EVA_RESPONSES.length],
    };

    responseIndexRef.current += 1;

    setMessages((prev) => [...prev, userMessage, evaResponse]);
    setInputText('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleContinue = () => {
    navigation.navigate('ZenQuestScreen');
  };

  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.gradientTop} />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Reflect With Eva</Text>
            <Text style={styles.headerSubtitle}>
              Talk about what's happening internally.
            </Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChatBubble message={item.text} sender={item.role} />
            )}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />

          <View style={styles.inputBarContainer}>
            <View style={styles.inputBar}>
              <TextInput
                style={styles.textInput}
                placeholder="Type your thoughts..."
                placeholderTextColor={`${theme.colors.softWhite}40`}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  !inputText.trim() && styles.sendButtonDisabled,
                ]}
                onPress={handleSend}
                disabled={!inputText.trim()}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>
                Continue to Zen Quest
              </Text>
            </TouchableOpacity>
          </View>
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
    height: 150,
    backgroundColor: theme.colors.midnight,
    opacity: 0.7,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: `${theme.colors.lavender}15`,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.softWhite,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSizes.small,
    color: `${theme.colors.softWhite}60`,
  },
  chatContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    flexGrow: 1,
  },
  inputBarContainer: {
    borderTopWidth: 1,
    borderTopColor: `${theme.colors.lavender}20`,
    backgroundColor: `${theme.colors.midnight}90`,
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: `${theme.colors.ink}`,
    borderRadius: theme.radius,
    borderWidth: 1,
    borderColor: `${theme.colors.lavender}20`,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: theme.fontSizes.body,
    color: theme.colors.softWhite,
    maxHeight: 100,
    paddingVertical: theme.spacing.xs,
  },
  sendButton: {
    backgroundColor: theme.colors.lavender,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: 9999,
    marginLeft: theme.spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: `${theme.colors.lavender}40`,
  },
  sendButtonText: {
    color: theme.colors.midnight,
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
  },
  continueButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  continueButtonText: {
    color: theme.colors.lavender,
    fontSize: theme.fontSizes.small,
    fontWeight: '600',
  },
});
