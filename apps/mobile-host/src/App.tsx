import React, {useState} from 'react';
import {LogBox, StyleSheet, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {
  LocalizationContextProvider,
  QueryClient,
  QueryClientProvider,
  SnackbarContextProvider,
  ThemeProvider,
} from 'mobile-core';

import AnimatedBootSplash from './components/AnimatedBootSplash';
import MainNavigator from './navigation/MainNavigator';
import VersionSelector from './navigation/VersionSelector';
import {OtaProvider} from './OtaProvider';

// import {init} from '@module-federation/runtime';
// import mfConfig from '../module-federation.config.mjs';
// init(mfConfig);

LogBox.ignoreAllLogs();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const queryClient = new QueryClient();
  const [version, setVersion] = useState('1.0');

  const hideSplashScreen = () => {
    setSplashVisible(false);
  };

  return (
    <OtaProvider currentVersion={version}>
      <View style={StyleSheet.absoluteFill}>
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
        <VersionSelector
          key={version}
          version={version}
          onSelect={setVersion}
        />
      </View>
    </OtaProvider>
  );
};

export default App;
