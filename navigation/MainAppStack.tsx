import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SagaScreen from '../screens/SagaScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type MainAppTabParamList = {
  Home: undefined;
  Saga: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainAppTabParamList>();

export default function MainAppStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Saga" component={SagaScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
