import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import {ProductDetailsNavigationProps} from '../navigation/types';
import {init, preloadRemote} from '@module-federation/enhanced/runtime';
import {ScriptManager} from '@callstack/repack/client';
import {loadRemote, registerRemotes} from '@module-federation/runtime';

interface RemoteInventory {
  inject: (parentElementId: string) => void;
  unmount: () => void;
}

const remoteName = 'MobileInventory';
const remoteEntry =
  'http://lois-10-mobileinventory-zephyr-repack-example-zep-1d1b5315b-ze.zephyr.local/MobileInventory.container.js.bundle';

// @ts-ignore
const ProductDetailsScreen = React.lazy(() => {
  // @ts-ignore federated dts not enabled yet
  // eslint-disable-next-line import/no-unresolved
  // registerRemotes([
  //   {
  //     name: remoteName,
  //     entry: remoteEntry,
  //   },
  // ]);

  return loadRemote('MobileInventory/ProductDetailsScreen');
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
