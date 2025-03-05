import React from 'react';

import {useNavigation} from '@react-navigation/native';

import useRemote from '../useRemote';

const LazyLoadedHomeScreen = () => {
  const HomeScreen = useRemote({
    scope: 'MobileInventory',
    module: 'HomeScreen',
    version: '2.0',
  });

  const navigation = useNavigation();

  const handleProductPress = (productId: string) => {
    navigation.navigate('ProductDetails', {productId});
  };

  return <HomeScreen onProductPress={handleProductPress} />;
};

export default LazyLoadedHomeScreen;
