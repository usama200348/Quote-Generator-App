import React from 'react';

import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  Room,
} from '../types';

import {
  colors,
  radius,
} from '../constants/theme';

type Props = {
  room: Room;
  onUpdate: (
    updates: Partial<Room>,
  ) => void;
  onRemove: () => void;
};

export default function RoomInput({
  room,
  onUpdate,
  onRemove,
}: Props) {
  return (
    <View
      style={{
        borderWidth: 1,

        borderColor: colors.border,

        borderRadius: radius.md,

        padding: 14,

        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',

          justifyContent:
            'space-between',

          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontWeight: '700',

            fontSize: 15,

            color: colors.text,
          }}
        >
          Room
        </Text>

        <Pressable
          onPress={onRemove}
        >
          <Text
            style={{
              color: colors.danger,

              fontWeight: '600',
            }}
          >
            Remove
          </Text>
        </Pressable>
      </View>

      <TextInput
        value={room.name}
        onChangeText={name =>
          onUpdate({ name })
        }
        placeholder="Room name"
        placeholderTextColor={
          colors.muted
        }
        style={{
          height: 46,

          marginTop: 12,

          borderWidth: 1,

          borderColor: colors.border,

          borderRadius: 10,

          paddingHorizontal: 12,

          color: colors.text,
        }}
      />

      <View
        style={{
          flexDirection: 'row',

          gap: 10,

          marginTop: 10,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              color: colors.secondary,
              marginBottom: 5,
            }}
          >
            Rate
          </Text>

          <TextInput
            value={String(room.rate)}
            onChangeText={value =>
              onUpdate({
                rate:
                  Number(value) || 0,
              })
            }
            keyboardType="decimal-pad"
            style={{
              height: 46,

              borderWidth: 1,

              borderColor:
                colors.border,

              borderRadius: 10,

              paddingHorizontal: 12,

              color: colors.text,
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              color: colors.secondary,
              marginBottom: 5,
            }}
          >
            Quantity
          </Text>

          <TextInput
            value={String(
              room.quantity,
            )}
            onChangeText={value =>
              onUpdate({
                quantity:
                  Number(value) || 1,
              })
            }
            keyboardType="number-pad"
            style={{
              height: 46,

              borderWidth: 1,

              borderColor:
                colors.border,

              borderRadius: 10,

              paddingHorizontal: 12,

              color: colors.text,
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',

          marginTop: 12,

          gap: 8,
        }}
      >
        {[
          {
            label: 'Per Room',
            value: 'perRoom' as const,
          },
          {
            label: 'Per Guest',
            value: 'perGuest' as const,
          },
        ].map(item => (
          <Pressable
            key={item.value}
            onPress={() =>
              onUpdate({
                pricingType:
                  item.value,
              })
            }
            style={{
              flex: 1,

              paddingVertical: 10,

              borderRadius: 10,

              alignItems: 'center',

              backgroundColor:
                room.pricingType ===
                item.value
                  ? colors.primary
                  : colors.primaryLight,
            }}
          >
            <Text
              style={{
                color:
                  room.pricingType ===
                  item.value
                    ? colors.white
                    : colors.primary,

                fontWeight: '600',
              }}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}