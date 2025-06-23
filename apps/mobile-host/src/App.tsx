import React, {useState} from 'react';
import {
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  LocalizationContextProvider,
  QueryClient,
  QueryClientProvider,
  SnackbarContextProvider,
  ThemeProvider,
  UpdateNotificationBar,
} from 'mobile-core';
import {DeviceEventEmitter, BackHandler} from 'react-native';
import {zeSdk} from './config/zephyr';
import AnimatedBootSplash from './components/AnimatedBootSplash';
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
      // console.log('handleUpdate.1');

      await zeSdk.checkAllRemoteUpdates();
      //  console.log('res', res);

      // once user click on exit, and we confirmed there is an update on one of the remote, we exit the app to allow on foreground event and preloading the new remote
      DeviceEventEmitter.emit('update-app', {
        remoteName: updateStep.remoteName,
      });
    }

    if (updateStep.step === 1 && updateStep.remoteName.length >= 1) {
      BackHandler.exitApp();
    }
  };

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
                  <UpdateNotificationBar
                    onUpdate={handleUpdate}
                    updateStep={updateStep}
                  />
                </NavigationContainer>
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
