import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { OnboardingProvider } from './context/OnboardingContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}
