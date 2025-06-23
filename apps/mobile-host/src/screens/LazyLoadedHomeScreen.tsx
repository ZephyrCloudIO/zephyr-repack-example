import React, {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {LoadingScreen, UpdateNotificationBar} from 'mobile-core';

import ErrorBoundary from '../components/ErrorBoundary';
import {zeSdk} from '../config/zephyr';
import {BackHandler, DeviceEventEmitter} from 'react-native';

const HomeScreen = React.lazy(() => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  return import('MobileInventory/HomeScreen');
});

const LazyLoadedHomeScreen = () => {
  const navigation = useNavigation();

  const [updateStep, setUpdateStep] = useState<{
    step: 0 | 1;
    remoteName: string;
  }>({step: 0, remoteName: ''});

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {productId});
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
    <ErrorBoundary name="InventoryScreen">
      <React.Suspense fallback={<LoadingScreen />}>
        <HomeScreen onProductPress={handleProductPress} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadedHomeScreen;
