import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  colors,
  IconButton,
  ModuleBoundary,
  Product,
  Text,
  useCartStore,
  useSnackbar,
  useTheme,
} from 'mobile-core';

type Props = {
  product: Product;
  selectedSize: string;
  selectedColor: string;
};

export default function AddToCart({
  product,
  selectedColor,
  selectedSize,
}: Props) {
  const styles = useStyles();
  const theme = useTheme();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { showSnackbar } = useSnackbar();

  const onAddToCart = () => {
    addItem({
      id: product.id,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    showSnackbar('Item added to cart');
  };

  return (
    <ModuleBoundary
      badgeText="CartModule/AddToCart"
      badgePosition={{ bottom: '80%', left: '30%' }}
      color={colors.moduleBoundaries.cart}>
      <View style={styles.addToCartOverlay}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>
        <View style={styles.verticalDivider} />
        <View style={styles.container}>
          <IconButton
            disabled={quantity === 0}
            iconColor={theme.colors.onPrimaryContainer}
            icon="minus"
            onPress={() => {
              setQuantity(q => q - 1);
            }}
          />
          <Text style={{ color: theme.colors.onPrimaryContainer }}>
            {quantity}
          </Text>
          <IconButton
            iconColor={theme.colors.onPrimaryContainer}
            icon="plus"
            onPress={() => {
              setQuantity(q => q + 1);
            }}
          />
          <IconButton
            testID="productDetailsScreen.addToOrderButton"
            icon="cart"
            iconColor={theme.colors.onPrimaryContainer}
            disabled={quantity === 0}
            onPress={onAddToCart}
          />
        </View>
      </View>
    </ModuleBoundary>
  );
}

const useStyles = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      width: '70%',
    },
    addToCartOverlay: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.primaryContainer,
      margin: 12,
      paddingHorizontal: 16,
    },
    priceContainer: {
      width: '30%',
    },
    verticalDivider: {
      width: 1,
      height: '70%',
      backgroundColor: theme.colors.onPrimaryContainer,
    },
    priceText: {
      color: theme.colors.onPrimaryContainer,
    },
  });

  return styles;
};
