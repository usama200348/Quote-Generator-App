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
  'SignUp'
>;

export default function SignUpScreen({
  navigation,
}: Props) {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [confirm, setConfirm] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const signup = async () => {
    if (!email || !password) {
      Alert.alert(
        'Error',
        'Please fill all fields.',
      );
      return;
    }

    if (password !== confirm) {
      Alert.alert(
        'Error',
        'Passwords do not match.',
      );
      return;
    }

    setLoading(true);

    const { data, error } =
      await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

    setLoading(false);

    if (error) {
      Alert.alert(
        'Sign Up Failed',
        error.message,
      );
      return;
    }

    if (!data.session) {
      Alert.alert(
        'Account Created',
        'Please check your email for verification.',
      );

      navigation.navigate('Login');
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
        <Text
          style={{
            fontSize: 30,

            fontWeight: '800',

            color: colors.text,

            marginBottom: 8,
          }}
        >
          Create Account
        </Text>

        <Text
          style={{
            color:
              colors.secondary,

            marginBottom: 25,
          }}
        >
          Create your Quote Generator account.
        </Text>

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

          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={
              colors.muted
            }
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            style={inputStyle}
          />

          <Pressable
            onPress={signup}
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
            }}
          >
            <Text
              style={{
                color: colors.white,

                fontWeight: '700',
              }}
            >
              {loading
                ? 'Creating...'
                : 'Create Account'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate(
                'Login',
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
              Already have an account?{' '}
              <Text
                style={{
                  color:
                    colors.primary,

                  fontWeight:
                    '700',
                }}
              >
                Sign In
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}