import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background} />
      <RootNavigator />
    </>
  );
}
