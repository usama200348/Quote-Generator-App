import 'react-native-url-polyfill/auto';
import Toast from 'react-native-toast-message';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
<Toast />
    </SafeAreaProvider>
  );
}