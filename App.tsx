import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { OnboardingProvider } from './context/OnboardingContext';
import { DailyFlowProvider } from './context/DailyFlowContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <DailyFlowProvider>
          <RootNavigator />
          <StatusBar style="light" />
        </DailyFlowProvider>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}
