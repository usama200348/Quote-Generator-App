import React from 'react';

import {
  Text,
  View,
} from 'react-native';

import {
  colors,
  radius,
} from '../constants/theme';

type Props = {
  message: string;
};

export default function MessagePreview({
  message,
}: Props) {
  return (
    <View
      style={{
        backgroundColor:
          '#F1F5F9',

        borderRadius: radius.md,

        padding: 14,
      }}
    >
      <Text
        style={{
          color: colors.text,

          lineHeight: 21,

          fontSize: 13,
        }}
      >
        {message}
      </Text>
    </View>
  );
}