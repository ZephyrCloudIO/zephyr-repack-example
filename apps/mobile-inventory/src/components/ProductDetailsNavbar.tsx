import React from 'react';
import {StyleSheet} from 'react-native';

import {Badge, IconButton, Navbar, useCartStore} from 'mobile-core';

type Props = {
  goBack: () => void;
  goToCart: () => void;
};

export default function ProductDetailsNavbar({goBack, goToCart}: Props) {
  const {items} = useCartStore();
  return (
    <Navbar
      leftSection={() => (
        <IconButton icon="chevron-left" iconColor="black" onPress={goBack} />
      )}
      rightSection={() => (
        <>
          <IconButton
            testID="productDetailsScreen.cartButton"
            icon="cart-outline"
            iconColor="blacks"
            onPress={goToCart}
          />
          <Badge size={16} style={styles.badge}>
            {items.length}
          </Badge>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
