import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

interface DailyFlowState {
  hasCheckedIn: boolean;
  hasReflected: boolean;
  hasCompletedZenQuest: boolean;
}

interface DailyFlowContextValue extends DailyFlowState {
  markCheckedIn: () => void;
  markReflected: () => void;
  markCompletedZenQuest: () => void;
  resetDailyFlow: () => void;
}

const DailyFlowContext = createContext<DailyFlowContextValue | undefined>(undefined);

interface DailyFlowProviderProps {
  children: ReactNode;
}

export function DailyFlowProvider({ children }: DailyFlowProviderProps) {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [hasReflected, setHasReflected] = useState(false);
  const [hasCompletedZenQuest, setHasCompletedZenQuest] = useState(false);

  const markCheckedIn = () => {
    setHasCheckedIn(true);
  };

  const markReflected = () => {
    setHasReflected(true);
  };

  const markCompletedZenQuest = () => {
    setHasCompletedZenQuest(true);
  };

  const resetDailyFlow = () => {
    setHasCheckedIn(false);
    setHasReflected(false);
    setHasCompletedZenQuest(false);
  };

  const value = useMemo<DailyFlowContextValue>(
    () => ({
      hasCheckedIn,
      hasReflected,
      hasCompletedZenQuest,
      markCheckedIn,
      markReflected,
      markCompletedZenQuest,
      resetDailyFlow,
    }),
    [hasCheckedIn, hasReflected, hasCompletedZenQuest]
  );

  return (
    <DailyFlowContext.Provider value={value}>
      {children}
    </DailyFlowContext.Provider>
  );
}

export function useDailyFlow(): DailyFlowContextValue {
  const context = useContext(DailyFlowContext);
  if (context === undefined) {
    throw new Error('useDailyFlow must be used within a DailyFlowProvider');
  }
  return context;
}
