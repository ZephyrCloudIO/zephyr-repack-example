import React from 'react';
import { StyleSheet } from 'react-native';

import {
  Button,
  CartItem,
  colors,
  ModuleBoundary,
  Product,
  Text,
  useAuthStore,
  useCartStore,
  useOrderStore,
  useProducts,
  useSnackbar,
  useTranslation,
  VStack,
} from 'mobile-core';

function calculateTotal(cart: Array<CartItem>, products?: Array<Product>) {
  return cart.reduce((acc, { id, quantity }) => {
    const product = products?.find(p => p.id === id);
    if (!product) {
      return acc;
    }

    return acc + product.price * quantity;
  }, 0);
}

type Props = {
  onCheckoutSuccess: () => void;
};

const CheckoutSection = ({ onCheckoutSuccess }: Props) => {
  const { t } = useTranslation('checkout');
  const { user } = useAuthStore();
  const { items, reset } = useCartStore();
  const { addOrder } = useOrderStore();
  const { data } = useProducts();

  const { showSnackbar } = useSnackbar();

  const handleCheckout = () => {
    if (user) {
      addOrder(user, items);
    }

    reset();

    showSnackbar(t('checkout_success'));
    onCheckoutSuccess();
  };

  return (
    <ModuleBoundary
      badgeText="CheckoutModule/CheckoutSection"
      badgePosition={{ top: '-30%', left: '10%' }}
      color={colors.moduleBoundaries.checkout}>
      <VStack style={styles.container}>
        <Text variant="titleLarge" style={styles.price}>
          {t('total_price', { price: calculateTotal(items, data).toFixed(2) })}
        </Text>
        <Button
          testID="cartScreen.checkoutButton"
          onPress={handleCheckout}
          mode="contained">
          {user !== null ? t('checkout') : t('guest_checkout')}
        </Button>
      </VStack>
    </ModuleBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    width: '100%',
    rowGap: 16,
    backgroundColor: colors.primary.white,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  price: {
    textAlign: 'center',
  },
});

export default CheckoutSection;
