import React from 'react';

import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

import {
  colors,
  radius,
  spacing,
} from '../constants/theme';

export default function Card({
  children,
  style,
  ...props
}: ViewProps) {
  return (
    <View
      {...props}
      style={[
        styles.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,

    borderWidth: 1,

    borderColor: colors.border,

    borderRadius: radius.lg,

    padding: spacing.lg,

    marginBottom: spacing.lg,
  },
});