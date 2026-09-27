import React from 'react';

import {
  Text,
  View,
} from 'react-native';

import {
  QuoteTotals,
} from '../types';

import {
  colors,
} from '../constants/theme';

type Props = {
  totals: QuoteTotals;
  symbol: string;
};

export default function TotalsDisplay({
  totals,
  symbol,
}: Props) {
  const money = (value: number) =>
    `${symbol}${value.toFixed(2)}`;

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: colors.secondary,
          }}
        >
          Subtotal
        </Text>

        <Text>
          {money(totals.subtotal)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: colors.secondary,
          }}
        >
          Discount
        </Text>

        <Text
          style={{
            color: colors.success,
          }}
        >
          -{money(totals.discount)}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: colors.secondary,
          }}
        >
          Tax
        </Text>

        <Text>
          {money(totals.tax)}
        </Text>
      </View>

      <View
        style={{
          borderTopWidth: 1,

          borderTopColor:
            colors.border,

          paddingTop: 16,

          flexDirection: 'row',

          justifyContent:
            'space-between',

          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 17,

            fontWeight: '800',

            color: colors.text,
          }}
        >
          Total
        </Text>

        <Text
          style={{
            fontSize: 25,

            fontWeight: '800',

            color: colors.primary,
          }}
        >
          {money(totals.total)}
        </Text>
      </View>
    </View>
  );
}