import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import {ProductDetailsNavigationProps} from '../navigation/types';

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
