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
} from 'mobile-core';

import AnimatedBootSplash from './components/AnimatedBootSplash';
import MainNavigator from './navigation/MainNavigator';

LogBox.ignoreAllLogs();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const queryClient = new QueryClient();
  const hideSplashScreen = () => {
    setSplashVisible(false);
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
