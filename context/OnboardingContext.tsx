import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingState {
  arcTitle: string;
  boss: string;
  finalForm: string;
  isComplete: boolean;
}

interface OnboardingContextValue extends OnboardingState {
  setArcTitle: (title: string) => void;
  setBoss: (boss: string) => void;
  setFinalForm: (form: string) => void;
  completeOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

interface OnboardingProviderProps {
  children: ReactNode;
}

export function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [arcTitle, setArcTitle] = useState('');
  const [boss, setBoss] = useState('');
  const [finalForm, setFinalForm] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const completeOnboarding = () => {
    setIsComplete(true);
  };

  const value: OnboardingContextValue = {
    arcTitle,
    boss,
    finalForm,
    isComplete,
    setArcTitle,
    setBoss,
    setFinalForm,
    completeOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
