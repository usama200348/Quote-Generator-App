import React from 'react';

import {
  ActivityIndicator,
  Pressable,
  Text,
} from 'react-native';

import {
  colors,
  radius,
} from '../constants/theme';

type Props = {
  title: string;
  loading?: boolean;
  onPress: () => void;
};

export default function AuthButton({
  title,
  loading = false,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={{
        height: 52,

        borderRadius: radius.md,

        alignItems: 'center',

        justifyContent: 'center',

        backgroundColor:
          colors.primary,

        opacity: loading ? 0.6 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator
          color={colors.white}
        />
      ) : (
        <Text
          style={{
            color: colors.white,

            fontSize: 15,

            fontWeight: '700',
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}