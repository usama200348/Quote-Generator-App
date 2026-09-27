import React, {
  useState,
} from 'react';

import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  Currency,
} from '../types';

import {
  currencies,
} from '../lib/currencies';

import {
  colors,
  radius,
} from '../constants/theme';

type Props = {
  selected: Currency;
  onSelect: (
    currency: Currency,
  ) => void;
};

export default function CurrencySelector({
  selected,
  onSelect,
}: Props) {
  const [visible, setVisible] =
    useState(false);

  return (
    <>
      <Pressable
        onPress={() =>
          setVisible(true)
        }
        style={{
          height: 50,

          borderWidth: 1,

          borderColor: colors.border,

          borderRadius: radius.md,

          backgroundColor:
            colors.white,

          paddingHorizontal: 14,

          justifyContent:
            'center',
        }}
      >
        <Text
          style={{
            color: colors.text,

            fontWeight: '600',
          }}
        >
          {selected.symbol}{' '}
          {selected.code}
        </Text>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setVisible(false)
        }
      >
        <View
          style={{
            flex: 1,

            justifyContent:
              'flex-end',

            backgroundColor:
              'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              backgroundColor:
                colors.white,

              borderTopLeftRadius:
                24,

              borderTopRightRadius:
                24,

              maxHeight: '70%',

              padding: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,

                fontWeight: '800',

                marginBottom: 16,

                color: colors.text,
              }}
            >
              Select Currency
            </Text>

            <ScrollView>
              {currencies.map(
                currency => (
                  <Pressable
                    key={
                      currency.code
                    }
                    onPress={() => {
                      onSelect(
                        currency,
                      );

                      setVisible(
                        false,
                      );
                    }}
                    style={{
                      paddingVertical: 16,

                      borderBottomWidth: 1,

                      borderBottomColor:
                        colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,

                        fontWeight:
                          currency.code ===
                          selected.code
                            ? '700'
                            : '400',

                        color:
                          colors.text,
                      }}
                    >
                      {currency.symbol}{' '}
                      {currency.code} —{' '}
                      {currency.name}
                    </Text>
                  </Pressable>
                ),
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}