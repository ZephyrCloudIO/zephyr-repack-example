import React from 'react';

import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import useRemote from '../useRemote';

const LazyLoadedOrderScreen = () => {
  const OrdersScreen = useRemote({
    scope: 'MobileOrders',
    module: 'OrdersScreen',
  });

  return (
    <ErrorBoundary name="OrderScreen">
      <React.Suspense fallback={<Placeholder />}>
        <OrdersScreen />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default LazyLoadedOrderScreen;
