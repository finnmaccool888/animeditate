import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SagaScreen from '../screens/SagaScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CheckInScreen from '../screens/CheckInScreen';
import ReflectionChatScreen from '../screens/ReflectionChatScreen';
import ZenQuestScreen from '../screens/ZenQuestScreen';

export type MainAppTabParamList = {
  Home: undefined;
  Saga: undefined;
  Settings: undefined;
};

export type MainAppStackParamList = {
  MainTabs: undefined;
  CheckInScreen: undefined;
  ReflectionChatScreen: undefined;
  ZenQuestScreen: undefined;
};

const Tab = createBottomTabNavigator<MainAppTabParamList>();
const Stack = createNativeStackNavigator<MainAppStackParamList>();

function MainTabs() {
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

export default function MainAppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="CheckInScreen"
        component={CheckInScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ReflectionChatScreen"
        component={ReflectionChatScreen}
        options={{
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ZenQuestScreen"
        component={ZenQuestScreen}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
