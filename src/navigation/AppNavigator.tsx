import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useQuoteState from '../screens/QuoteScreen';

export type RootStackParamList = {
  Quote: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Quote"
          component={useQuoteState}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}