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

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {productId});
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
