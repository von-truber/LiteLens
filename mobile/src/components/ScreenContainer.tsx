import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type ScreenContainerProps = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={[styles.inner, style as any]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flex: 1,
    backgroundColor: colors.background,
  },
});


