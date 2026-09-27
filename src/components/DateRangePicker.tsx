import React from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import {
  colors,
  radius,
} from '../constants/theme';

type Props = {
  checkIn: string;
  checkOut: string;
  onCheckInChange: (value: string) => void;
  onCheckOutChange: (value: string) => void;
};

export default function DateRangePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
}: Props) {
  const [mode, setMode] =
    React.useState<'in' | 'out' | null>(
      null,
    );

  const dateValue = checkIn
    ? new Date(
        mode === 'out'
          ? checkOut || checkIn
          : checkIn,
      )
    : new Date();

  return (
    <View>
      <Text
        style={{
          fontWeight: '600',
          color: colors.text,
          marginBottom: 8,
        }}
      >
        Stay Dates
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
        }}
      >
        <Pressable
          onPress={() => setMode('in')}
          style={{
            flex: 1,

            borderWidth: 1,

            borderColor: colors.border,

            borderRadius: radius.md,

            padding: 14,

            backgroundColor:
              colors.white,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: colors.secondary,
            }}
          >
            CHECK-IN
          </Text>

          <Text
            style={{
              marginTop: 5,
              color: colors.text,
            }}
          >
            {checkIn || 'Select date'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setMode('out')}
          style={{
            flex: 1,

            borderWidth: 1,

            borderColor: colors.border,

            borderRadius: radius.md,

            padding: 14,

            backgroundColor:
              colors.white,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: colors.secondary,
            }}
          >
            CHECK-OUT
          </Text>

          <Text
            style={{
              marginTop: 5,
              color: colors.text,
            }}
          >
            {checkOut || 'Select date'}
          </Text>
        </Pressable>
      </View>

      {mode && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          minimumDate={
            mode === 'out' && checkIn
              ? new Date(checkIn)
              : new Date()
          }
          onChange={(_, date) => {
            setMode(null);

            if (!date) return;

            const value =
              date.toISOString();

            if (mode === 'in') {
              onCheckInChange(value);
            } else {
              onCheckOutChange(value);
            }
          }}
        />
      )}
    </View>
  );
}