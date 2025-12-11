import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingStack from './OnboardingStack';
import MainAppStack from './MainAppStack';
import { useOnboarding } from '../context/OnboardingContext';

export default function RootNavigator() {
  const { isComplete } = useOnboarding();

  return (
    <NavigationContainer>
      {isComplete ? <MainAppStack /> : <OnboardingStack />}
    </NavigationContainer>
  );
}
