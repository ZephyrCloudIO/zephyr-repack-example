import React, { useEffect, useState } from 'react';
import { LogBox, View, Button, Text } from 'react-native';

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

import { ZephyrRepackSdk } from 'mobile-core';

const zeSDK = new ZephyrRepackSdk();

// Initialize SDK with default polling (can be configured by users)
zeSDK.startPolling();

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateUrl, setUpdateUrl] = useState<string | null>(null);
  const [updateProgress, setUpdateProgress] = useState(zeSDK.getUpdateProgress());
  const [previousVersion, setPreviousVersion] = useState(zeSDK.getPreviousVersion());
  const queryClient = new QueryClient();

  // Check for updates on initial load
  useEffect(() => {
    const checkForUpdates = async () => {
      const updateResult = await zeSDK.confirmUpdate({ app: 'MobileCart' });
      if (updateResult?.updated && updateResult.remote_url) {
        setUpdateAvailable(true);
        setUpdateUrl(updateResult.remote_url);
      }
    };

    checkForUpdates();
  }, []);

  // Poll for update progress info (no need to poll the server here, the SDK handles that)
  useInterval(() => {
    setUpdateProgress(zeSDK.getUpdateProgress());
  }, 1000);

  // Log previous version
  useEffect(() => {
    if (previousVersion) {
      console.log('Previous version:', previousVersion);
    }
  }, [previousVersion]);

  const hideSplashScreen = () => {
    setSplashVisible(false);
  };

  // Handle update
  const handleUpdate = async () => {
    if (!updateUrl) {
      // Fetch latest URL if not available
      const latestUrl = await zeSDK.fetchLatestRemoteUrl();
      if (latestUrl) {
        // Load the remote using the URL
        try {
          // Assuming repack is globally available
          repack.loadRemote(latestUrl);
        } catch (error) {
          console.error('Failed to load remote:', error);
        }
      }
    } else {
      // Use cached URL
      try {
        repack.loadRemote(updateUrl);
      } catch (error) {
        console.error('Failed to load remote:', error);
      }
    }
  };

  // Update UI if update is available
  if (updateAvailable) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ marginBottom: 20 }}>
          Update available. Current version: {updateProgress.currentVersion}
        </Text>
        {previousVersion && (
          <Text style={{ marginBottom: 20 }}>
            Previous version: {previousVersion}
          </Text>
        )}
        <Text style={{ marginBottom: 20 }}>
          Status: {updateProgress.status}
        </Text>
        <Button
          title="Update Now"
          onPress={handleUpdate}
        />
      </View>
    );
  }

  // Log build ID
  console.log('ZE_BUILD_ID', ZE_BUILD_ID);

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
