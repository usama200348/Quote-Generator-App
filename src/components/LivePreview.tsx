import React from 'react';

import {
  Text,
  View,
} from 'react-native';

import {
  QuoteState,
  QuoteTotals,
} from '../types';

import {
  colors,
  radius,
} from '../constants/theme';

type Props = {
  quote: QuoteState;
  totals: QuoteTotals;
};

export default function LivePreview({
  quote,
  totals,
}: Props) {
  return (
    <View
      style={{
        backgroundColor:
          colors.white,

        borderRadius: radius.lg,

        padding: 20,

        borderWidth: 1,

        borderColor:
          colors.border,
      }}
    >
      <Text
        style={{
          fontSize: 20,

          fontWeight: '800',

          color: colors.text,
        }}
      >
        Quote Preview
      </Text>

      <Text
        style={{
          marginTop: 5,

          color: colors.secondary,
        }}
      >
        {quote.destination ||
          'Your destination'}
      </Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        {quote.rooms.map(room => (
          <View
            key={room.id}
            style={{
              flexDirection: 'row',

              justifyContent:
                'space-between',

              marginBottom: 10,
            }}
          >
            <Text>
              {room.name} ×{' '}
              {room.quantity}
            </Text>

            <Text>
              {quote.currency.symbol}
              {(
                room.rate *
                room.quantity
              ).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          marginTop: 10,

          paddingTop: 15,

          borderTopWidth: 1,

          borderTopColor:
            colors.border,
        }}
      >
        <View
          style={{
            flexDirection: 'row',

            justifyContent:
              'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 17,

              fontWeight: '700',
            }}
          >
            Total
          </Text>

          <Text
            style={{
              fontSize: 22,

              fontWeight: '800',

              color: colors.primary,
            }}
          >
            {quote.currency.symbol}
            {totals.total.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}