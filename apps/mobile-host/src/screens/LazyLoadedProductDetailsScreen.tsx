import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import {ProductDetailsNavigationProps} from '../navigation/types';
// import {
//   registerRemotes,
//   loadRemote,
//   preloadRemote,
// } from '@module-federation/enhanced/runtime';
// import {ScriptManager} from '@callstack/repack/client';
// import {ReactNativeZephyrSdk} from 'react-native-zephyr-sdk';
// import Config from 'react-native-config';

// const zeSDK = new ReactNativeZephyrSdk({
//   apiKey: Config.ZE_API_KEY as string,
// });

// ScriptManager.shared.on('prefetching', script => {
//   console.log('prefetching', script);
// });

const ProductDetailsScreen = React.lazy(async () => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  return await import('MobileInventory/ProductDetailsScreen');
});

type Props = ProductDetailsNavigationProps;

const LazyLoadedProductDetailsScreen = ({navigation, route}: Props) => {
  const goBack = () => {
    navigation.goBack();
  };

  const goToCart = () => {
    // @ts-ignore
    navigation.navigate('Main', {screen: 'CartNavigator'});
  };

  const productId = route.params.productId;

  return (
    <ErrorBoundary name="ProductDetailsScreen">
      <React.Suspense fallback={<Placeholder />}>
        <ProductDetailsScreen
          goBack={goBack}
          goToCart={goToCart}
          productId={productId}
        />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadedProductDetailsScreen;
