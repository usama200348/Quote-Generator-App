import React from 'react';

import {
  Pressable,
  Text,
  View,
} from 'react-native';

import {
  LogOut,
  Save,
} from 'lucide-react-native';

import { supabase } from '../lib/supabase';

import {
  colors,
  spacing,
} from '../constants/theme';

type Props = {
  onSaved?: () => void;
};

export default function AppHeader({
  onSaved,
}: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'space-between',

        paddingHorizontal: spacing.lg,

        paddingVertical: spacing.md,

        backgroundColor:
          colors.white,

        borderBottomWidth: 1,

        borderBottomColor:
          colors.border,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 21,

            fontWeight: '800',

            color: colors.text,
          }}
        >
          Quote Generator
        </Text>

        <Text
          style={{
            fontSize: 12,

            color:
              colors.secondary,

            marginTop: 2,
          }}
        >
          Create professional quotes
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',

          gap: 8,
        }}
      >
        <Pressable
          onPress={onSaved}
          style={{
            width: 42,

            height: 42,

            borderRadius: 12,

            backgroundColor:
              colors.primaryLight,

            alignItems: 'center',

            justifyContent: 'center',
          }}
        >
          <Save
            size={19}
            color={colors.primary}
          />
        </Pressable>

        <Pressable
          onPress={() =>
            supabase.auth.signOut()
          }
          style={{
            width: 42,

            height: 42,

            borderRadius: 12,

            backgroundColor:
              '#FEF2F2',

            alignItems: 'center',

            justifyContent: 'center',
          }}
        >
          <LogOut
            size={19}
            color={colors.danger}
          />
        </Pressable>
      </View>
    </View>
  );
}