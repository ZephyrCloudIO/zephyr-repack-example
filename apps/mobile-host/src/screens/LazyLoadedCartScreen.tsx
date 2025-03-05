import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import {CartNavigationProps} from '../navigation/types';
import useRemote from '../useRemote';

type Props = CartNavigationProps;

const LazyLoadedCartScreen = ({navigation}: Props) => {
  const CartScreen = useRemote({
    scope: 'MobileCart',
    module: 'CartScreen',
  });

  const handleCheckoutSuccess = () => {
    navigation.navigate('CheckoutSuccess');
  };

  return (
    <ErrorBoundary name="CartScreen">
      <React.Suspense fallback={<Placeholder />}>
        <CartScreen onCheckoutSuccess={handleCheckoutSuccess} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadedCartScreen;
