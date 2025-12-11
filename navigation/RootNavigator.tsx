import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingStack from './OnboardingStack';
import MainAppStack from './MainAppStack';

export default function RootNavigator() {
  // For now, hardcode onboarding as incomplete to show OnboardingStack
  // In future, this will check actual onboarding state from context/storage
  const [onboardingComplete] = useState(false);

  return (
    <NavigationContainer>
      {onboardingComplete ? <MainAppStack /> : <OnboardingStack />}
    </NavigationContainer>
  );
}
