import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import MeetEvaScreen from '../screens/MeetEvaScreen';
import OnboardingArcTitleScreen from '../screens/OnboardingArcTitleScreen';
import OnboardingBossScreen from '../screens/OnboardingBossScreen';
import OnboardingFinalFormScreen from '../screens/OnboardingFinalFormScreen';
import OnboardingSummaryScreen from '../screens/OnboardingSummaryScreen';

export type OnboardingStackParamList = {
  Welcome: undefined;
  MeetEva: undefined;
  OnboardingArcTitle: undefined;
  OnboardingBoss: undefined;
  OnboardingFinalForm: undefined;
  OnboardingSummary: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MeetEva" component={MeetEvaScreen} />
      <Stack.Screen name="OnboardingArcTitle" component={OnboardingArcTitleScreen} />
      <Stack.Screen name="OnboardingBoss" component={OnboardingBossScreen} />
      <Stack.Screen name="OnboardingFinalForm" component={OnboardingFinalFormScreen} />
      <Stack.Screen name="OnboardingSummary" component={OnboardingSummaryScreen} />
    </Stack.Navigator>
  );
}
