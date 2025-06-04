import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {LoadingScreen} from 'mobile-core';

import ErrorBoundary from '../components/ErrorBoundary';
import {loadRemote, registerRemotes} from '@module-federation/runtime';

const remoteName = 'MobileInventory';
const remoteEntry =
  'http://lois-10-mobileinventory-zephyr-repack-example-zep-1d1b5315b-ze.zephyr.local/MobileInventory.container.js.bundle';

// @ts-ignore
const HomeScreen = React.lazy(() => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  // registerRemotes([
  //   {
  //     name: remoteName,
  //     entry: remoteEntry,
  //   },
  // ]);
  return loadRemote('MobileInventory/HomeScreen');
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
