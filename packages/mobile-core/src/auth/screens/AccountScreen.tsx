import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';

import { LocalizationContext } from '../../i18n';
import { SUPPORTED_LANGUAGES } from '../../i18n/constants.ts';
import {
  Button,
  Checkbox,
  colors,
  Divider,
  List,
  RadioButton,
  Text,
  VStack,
} from '../../ui';
import { useModuleBoundaryStore } from '../../utils';
import { useAuthStore } from '../store/useAuthStore';

interface Props {
  appVersion: string;
  onLoginPress: () => void;
}

export const AccountScreen = ({ onLoginPress, appVersion }: Props) => {
  const { logout, user } = useAuthStore();
  const { language, updateLanguage } = useContext(LocalizationContext);
  const { t } = useTranslation('account');

  const { toggle, isEnabled } = useModuleBoundaryStore();

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    onLoginPress();
  };

  const handleLanguageChange = (code: string) => updateLanguage(code);

  return (
    <SafeAreaView style={styles.root}>
      <VStack style={styles.container}>
        <Text style={styles.title} variant="titleMedium">
          {t('account.title').toUpperCase()}
        </Text>
        <Divider />
        <VStack style={styles.mainContent}>
          {user ? (
            <Button mode="contained" onPress={handleLogout}>
              {t('account.log_out').toUpperCase()}
            </Button>
          ) : (
            <Button
              testID="accountScreen.loginButton"
              mode="contained"
              onPress={handleLogin}>
              {t('account.log_in').toUpperCase()}
            </Button>
          )}
          {user ? (
            <Text testID="accountScreen.userLabel">
              {t('account.user_label', { user })}
            </Text>
          ) : null}
          <VStack style={styles.settingsShadowContainer}>
            <VStack style={styles.settingsRadiusContainer}>
              <Checkbox.Item
                label={t('account.module_boundaries')}
                status={isEnabled ? 'checked' : 'unchecked'}
                onPress={toggle}
              />
              <Divider />
              <List.Accordion
                title={t('account.app_language')}
                left={props => (
                  <List.Icon {...props} icon="format-letter-case" />
                )}>
                <RadioButton.Group
                  value={language}
                  onValueChange={handleLanguageChange}>
                  {SUPPORTED_LANGUAGES.map(({ code, title }) => (
                    <RadioButton.Item key={code} label={title} value={code} />
                  ))}
                </RadioButton.Group>
              </List.Accordion>
            </VStack>
          </VStack>
        </VStack>
        <Text style={styles.version}>
          {t('account.version', { version: appVersion })}
        </Text>
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    rowGap: 16,
  },
  title: {
    textAlign: 'center',
  },
  settingsShadowContainer: {
    borderRadius: 6,
    backgroundColor: colors.primary.white,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  settingsRadiusContainer: {
    borderRadius: 6,
  },
  version: {
    textAlign: 'center',
  },
  container: {
    padding: 16,
    flex: 1,
    rowGap: 16,
  },
});
