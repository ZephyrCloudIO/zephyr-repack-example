import React, {useEffect, useState} from 'react';
import {
  Button,
  DeviceEventEmitter,
  BackHandler,
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {registerRemotes} from '@module-federation/runtime';
import {NavigationContainer} from '@react-navigation/native';
import {
  LocalizationContextProvider,
  QueryClient,
  QueryClientProvider,
  SnackbarContextProvider,
  ThemeProvider,
} from 'mobile-core';

import AnimatedBootSplash from './components/AnimatedBootSplash';
import {UpdateNotificationBar} from './components/UpdateNotificationBar';
import MainNavigator from './navigation/MainNavigator';

LogBox.ignoreAllLogs();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [updateStep, setUpdateStep] = useState<{
    step: 0 | 1;
    remoteName: string;
  }>({step: 0, remoteName: ''});
  const queryClient = new QueryClient();

  const hideSplashScreen = () => {
    setSplashVisible(false);
  };

  // Handle update
  const handleUpdate = async () => {
    if (updateStep.step === 0) {
      setUpdateStep({step: 1, remoteName: ''});

      // once user click on exit, and we confirmed there is an update on one of the remote, we exit the app to allow on foreground event and preloading the new remote
      DeviceEventEmitter.emit('update-app', {
        remoteName: updateStep.remoteName,
      });
    }

    if (updateStep.step === 1 && updateStep.remoteName) {
      BackHandler.exitApp();
    }
  };

  // const remoteName = 'MobileInventory';
  // const remoteEntry =
  //   'http://lois-10-mobileinventory-zephyr-repack-example-zep-1d1b5315b-ze.zephyr.local/mf-manifest.json';

  // registerRemotes(
  //   [
  //     {
  //       name: remoteName,
  //       entry: remoteEntry,
  //     },
  //   ],
  //   {force: true},
  // );

  return (
    <>
      <SafeAreaView style={styles.AndroidSafeArea}>
        {isSplashVisible ? (
          <AnimatedBootSplash onAnimationEnd={hideSplashScreen} />
        ) : null}
        <ThemeProvider>
          <LocalizationContextProvider>
            <QueryClientProvider client={queryClient}>
              <SnackbarContextProvider>
                <NavigationContainer>
                  <MainNavigator />
                </NavigationContainer>
                <UpdateNotificationBar
                  updateStep={updateStep}
                  onUpdate={handleUpdate}
                />
              </SnackbarContextProvider>
            </QueryClientProvider>
          </LocalizationContextProvider>
        </ThemeProvider>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default App;
