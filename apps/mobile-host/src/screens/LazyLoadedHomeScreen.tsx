import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {LoadingScreen} from 'mobile-core';

import ErrorBoundary from '../components/ErrorBoundary';
import RemoteComponent from '../RemoteComponent';
import useRemote from '../useRemote';

// const HomeScreen = React.lazy(() => {
//   // @ts-ignore federated dts not enabled yet
//   // eslint-disable-next-line import/no-unresolved
//   return import('MobileInventory/HomeScreen');
// });

const LazyLoadedHomeScreen = () => {
  const HomeScreen = useRemote({
    scope: 'MobileInventory',
    module: 'HomeScreen',
    version: '1.0',
  });

  const navigation = useNavigation();

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {productId});
  };

  return (
    <HomeScreen onProductPress={handleProductPress} />
    // <RemoteComponent
    //   scope="MobileInventory"
    //   module="HomeScreen"
    //   version="1.0"
    //   onProductPress={handleProductPress}
    // />
  );

  // return (
  //   <ErrorBoundary name="InventoryScreen">
  //     <React.Suspense fallback={<LoadingScreen />}>
  //       <HomeScreen onProductPress={handleProductPress} />
  //     </React.Suspense>
  //   </ErrorBoundary>
  // );
};

export default LazyLoadedHomeScreen;
