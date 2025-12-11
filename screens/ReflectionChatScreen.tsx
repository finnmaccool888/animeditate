import React, { useState, useRef, useEffect } from 'react';
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
import { useDailyFlow } from '../context/DailyFlowContext';
import { useOnboarding } from '../context/OnboardingContext';
import ChatBubble from '../components/ChatBubble';
import PrimaryButton from '../components/PrimaryButton';
import {
  generateEvaReflectionResponse,
  generateInitialReflectionMessages,
  ReflectionContext,
} from '../services/evaPlaceholder';

type ReflectionChatScreenNavigationProp = NativeStackNavigationProp<MainAppStackParamList>;

interface Message {
  id: string;
  role: 'eva' | 'user';
  text: string;
  isTyping?: boolean;
}

export default function ReflectionChatScreen() {
  const navigation = useNavigation<ReflectionChatScreenNavigationProp>();
  const { markReflected } = useDailyFlow();
  const { arcTitle, boss, finalForm } = useOnboarding();

  // Build reflection context from onboarding values
  // TODO: Get mood from CheckInScreen when persistence is added
  const reflectionContext: ReflectionContext = {
    arcTitle: arcTitle || 'Your Journey',
    boss: boss || 'your challenge',
    finalForm: finalForm || 'your true self',
    mood: 'present', // Placeholder until mood storage is implemented
  };

  // Generate initial messages using placeholder AI
  const initialMessages = generateInitialReflectionMessages(reflectionContext).map(
    (msg, index) => ({
      id: `initial-${index}`,
      role: msg.role,
      text: msg.text,
    })
  );

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isEvaTyping, setIsEvaTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    const timer = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || isEvaTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: inputText.trim(),
    };

    // Add user message
    setMessages((prev) => [...prev, userMessage]);
    const sentText = inputText.trim();
    setInputText('');

    // Show Eva typing indicator
    setIsEvaTyping(true);
    const typingMessage: Message = {
      id: 'typing',
      role: 'eva',
      text: '',
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    // Simulate Eva thinking delay (600-900ms)
    const thinkingDelay = 600 + Math.floor(sentText.length * 3);
    const clampedDelay = Math.min(thinkingDelay, 1200);

    setTimeout(() => {
      // Generate Eva's response using placeholder AI
      const evaResponse = generateEvaReflectionResponse(sentText, reflectionContext);

      const evaMessage: Message = {
        id: `eva-${Date.now()}`,
        role: 'eva',
        text: evaResponse.text,
      };

      // Replace typing indicator with actual response
      setMessages((prev) => {
        const withoutTyping = prev.filter((msg) => msg.id !== 'typing');
        return [...withoutTyping, evaMessage];
      });
      setIsEvaTyping(false);
    }, clampedDelay);
  };

  const handleContinue = () => {
    markReflected();
    navigation.navigate('ZenQuestScreen');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.isTyping) {
      return <ChatBubble message="" sender="eva" isTyping />;
    }
    return <ChatBubble message={item.text} sender={item.role} />;
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
            renderItem={renderMessage}
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
                editable={!isEvaTyping}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  (!inputText.trim() || isEvaTyping) && styles.sendButtonDisabled,
                ]}
                onPress={handleSend}
                disabled={!inputText.trim() || isEvaTyping}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              label="Continue to Zen Quest"
              onPress={handleContinue}
              style={styles.continueButton}
            />
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
    marginTop: theme.spacing.md,
  },
});
