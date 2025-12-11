import { StatusBar } from 'expo-status-bar';
import RootNavigator from './navigation/RootNavigator';
import { OnboardingProvider } from './context/OnboardingContext';

export default function App() {
  return (
    <OnboardingProvider>
      <RootNavigator />
      <StatusBar style="light" />
    </OnboardingProvider>
  );
}
