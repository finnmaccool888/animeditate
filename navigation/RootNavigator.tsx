import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingStack from './OnboardingStack';
import MainAppStack from './MainAppStack';

export default function RootNavigator() {
  // For now, hardcode onboarding as complete to show MainAppStack
  // In future, this will check actual onboarding state from context/storage
  const [onboardingComplete] = useState(true);

  return (
    <NavigationContainer>
      {onboardingComplete ? <MainAppStack /> : <OnboardingStack />}
    </NavigationContainer>
  );
}
