import React, { useState } from 'react';
import { LogBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import {
  LocalizationContextProvider,
  QueryClient,
  QueryClientProvider,
  SnackbarContextProvider,
  ThemeProvider,
} from 'mobile-core';

import AnimatedBootSplash from './components/AnimatedBootSplash';
import MainNavigator from './navigation/MainNavigator';

LogBox.ignoreAllLogs();

import { ZephyrSdk } from 'mobile-core';

const zeSDK = new ZephyrSdk();

zeSDK.verifyValues();


//const BUILD_ID = ZE_BUILD_ID;

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const queryClient = new QueryClient();

  //  console.log('ZE_EDGE_URL', process.env.ZE_EDGE_URL || ZE_EDGE_URL);
  console.log('ZE_BUILD_ID', ZE_BUILD_ID);

  const hideSplashScreen = () => {
    setSplashVisible(false);
  };

  return (
    <>
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
            </SnackbarContextProvider>
          </QueryClientProvider>
        </LocalizationContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
