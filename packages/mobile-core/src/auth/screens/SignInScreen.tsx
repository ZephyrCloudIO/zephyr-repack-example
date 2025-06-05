import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {Button, TextInput} from '../../ui';
import {colors, Text, useTheme} from '../../ui';
import {ZephyrLogo} from '../../ui/components/ZephyrLogo';
import {useAuthStore} from '../store/useAuthStore';

function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(null);
    }, ms);
  });
}

export const SignInScreen = () => {
  const theme = useTheme();
  const {t} = useTranslation('account');

  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {login} = useAuthStore();

  const onSubmit = async ({email}: {email: string}) => {
    await wait(1000);
    login(email);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback
        accessibilityRole="button"
        onPress={Keyboard.dismiss}
        accessible={false}>
        <View
          style={[
            styles.container,
            {backgroundColor: theme.colors.background},
          ]}>
          <View style={styles.heroContainer}>
            <View style={styles.logoContainer}>
              <ZephyrLogo style={styles.logo} />
            </View>

            <Text style={styles.subtitle}>{t('sign_in.header')}</Text>
          </View>
          <View style={styles.form}>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Email is required!',
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format!',
                },
              }}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => (
                <View style={styles.field}>
                  <Text style={styles.label}>{t('sign_in.email')}</Text>
                  <TextInput
                    testID="singInScreen.emailInput"
                    value={value}
                    autoCapitalize="none"
                    mode="outlined"
                    outlineStyle={{
                      borderColor:
                        error !== undefined
                          ? theme.colors.error
                          : colors.grayscale.midGray,
                    }}
                    placeholder={t('sign_in.email')}
                    accessibilityLabel="Enter your email"
                    error={error !== undefined}
                    inputMode="email"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    autoFocus
                  />
                  {error ? (
                    <Text
                      testID="singInScreen.emailError"
                      style={{color: theme.colors.error}}>
                      {error.message}
                    </Text>
                  ) : null}
                </View>
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Password is required!',
                },
                minLength: {
                  value: 8,
                  message: 'Password should contain at least 8 characters!',
                },
              }}
              render={({
                field: {onChange, onBlur, value},
                fieldState: {error},
              }) => {
                return (
                  <View style={styles.field}>
                    <Text style={styles.label}>{t('sign_in.password')}</Text>
                    <TextInput
                      testID="singInScreen.passwordInput"
                      value={value}
                      mode="outlined"
                      autoCapitalize="none"
                      placeholder={t('sign_in.password')}
                      secureTextEntry
                      error={error !== undefined}
                      outlineStyle={{
                        borderColor:
                          error !== undefined
                            ? theme.colors.error
                            : colors.grayscale.midGray,
                      }}
                      accessibilityLabel="Enter your password"
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                    {error ? (
                      <Text
                        testID="singInScreen.passwordError"
                        style={{color: theme.colors.error}}>
                        {error.message}
                      </Text>
                    ) : null}
                  </View>
                );
              }}
              name="password"
            />
          </View>
          <Button
            testID="singInScreen.signInButton"
            labelStyle={styles.login}
            mode="contained"
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}>
            {t('sign_in.log_in')}
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 24,
    padding: 16,
  },
  heroContainer: {
    alignItems: 'center',
    gap: 16,
  },
  logoContainer: {
    padding: 16,
    backgroundColor: colors.theme.onBackground,
  },
  logo: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  subtitle: {fontSize: 18, color: colors.grayscale.darkGray},
  form: {
    rowGap: 24,
  },
  field: {
    rowGap: 8,
  },
  label: {
    color: colors.grayscale.midGray,
  },
  login: {
    textTransform: 'uppercase',
    backgroundColor: 'black',
  },
});
