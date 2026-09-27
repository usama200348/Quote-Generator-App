import React, {
  useState,
} from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  supabase,
} from '../lib/supabase';

import {
  colors,
  radius,
} from '../constants/theme';

import {
  RootStackParamList,
} from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export default function LoginScreen({
  navigation,
}: Props) {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const login = async () => {
    if (!email || !password) {
      Alert.alert(
        'Error',
        'Enter email and password.',
      );
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email: email.trim(),
          password,
        },
      );

    setLoading(false);

    if (error) {
      Alert.alert(
        'Login Failed',
        error.message,
      );
    }
  };

  const inputStyle = {
    height: 50,

    borderWidth: 1,

    borderColor: colors.border,

    borderRadius: radius.md,

    paddingHorizontal: 14,

    marginBottom: 15,

    color: colors.text,
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,

        backgroundColor:
          colors.background,
      }}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,

          justifyContent:
            'center',

          padding: 24,
        }}
      >
        <View
          style={{
            alignItems: 'center',

            marginBottom: 30,
          }}
        >
          <View
            style={{
              width: 65,

              height: 65,

              borderRadius: 18,

              backgroundColor:
                colors.primary,

              alignItems: 'center',

              justifyContent:
                'center',
            }}
          >
            <Text
              style={{
                color: colors.white,

                fontSize: 30,

                fontWeight: '900',
              }}
            >
              Q
            </Text>
          </View>

          <Text
            style={{
              marginTop: 18,

              fontSize: 28,

              fontWeight: '800',

              color: colors.text,
            }}
          >
            Welcome Back
          </Text>

          <Text
            style={{
              marginTop: 6,

              color:
                colors.secondary,
            }}
          >
            Sign in to Quote Generator
          </Text>
        </View>

        <View
          style={{
            backgroundColor:
              colors.white,

            padding: 20,

            borderRadius:
              radius.xl,

            borderWidth: 1,

            borderColor:
              colors.border,
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor={
              colors.muted
            }
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={inputStyle}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={
              colors.muted
            }
            value={password}
            onChangeText={
              setPassword
            }
            secureTextEntry
            style={inputStyle}
          />

          <Pressable
            onPress={login}
            disabled={loading}
            style={{
              height: 52,

              borderRadius:
                radius.md,

              backgroundColor:
                colors.primary,

              alignItems: 'center',

              justifyContent:
                'center',

              opacity: loading
                ? 0.6
                : 1,
            }}
          >
            <Text
              style={{
                color: colors.white,

                fontWeight: '700',
              }}
            >
              {loading
                ? 'Signing In...'
                : 'Sign In'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate(
                'SignUp',
              )
            }
            style={{
              alignItems:
                'center',

              marginTop: 20,
            }}
          >
            <Text
              style={{
                color:
                  colors.secondary,
              }}
            >
              Don't have an account?{' '}
              <Text
                style={{
                  color:
                    colors.primary,

                  fontWeight:
                    '700',
                }}
              >
                Sign Up
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}