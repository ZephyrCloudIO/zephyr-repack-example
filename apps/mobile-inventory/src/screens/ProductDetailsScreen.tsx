import React, { Suspense, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Card,
  colors,
  LoadingScreen,
  ModuleBoundary,
  Text,
  useProducts,
} from 'mobile-core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProductDetails from '../components/ProductDetails';
import ProductDetailsNavbar from '../components/ProductDetailsNavbar';

// @ts-ignore federated dts not enabled yet
// eslint-disable-next-line import/no-unresolved
const AddToCart = React.lazy(() => import('MobileCart/AddToCart'));

type Props = {
  goBack: () => void;
  goToCart: () => void;
  productId: string;
};

export default ({ goBack, goToCart, productId }: Props) => {
  const styles = useStyles();
  const { data, isLoading } = useProducts();

  const [selectedColor, setSelectedColor] = React.useState<string>();
  const [selectedSize, setSelectedSize] = React.useState<string>();

  const product = data?.find(p => p.id === productId);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colorsAvailable[0].name);
      setSelectedSize(product.sizesAvailable[0]);
    }
  }, [product]);

  return (
    <ModuleBoundary
      badgeText="InventoryModule/ProductDetailsScreen"
      badgePosition={{ bottom: '16%', left: '30%' }}
      withBottomRadius
      withTopRadius
      color={colors.moduleBoundaries.inventory}>
      <View style={styles.container}>
        {isLoading && <LoadingScreen />}
        {!product && !isLoading && <Text>Item not found.</Text>}
        {product && !isLoading && (
          <>
            <ProductDetailsNavbar goBack={goBack} goToCart={goToCart} />
            <ProductDetails
              product={product}
              onColorChange={setSelectedColor}
              onSizeChange={setSelectedSize}
            />
            <Card style={styles.actionsCard}>
              <Suspense>
                <AddToCart
                  product={product}
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                />
              </Suspense>
            </Card>
          </>
        )}
      </View>
    </ModuleBoundary>
  );
};

const useStyles = () => {
  const { bottom } = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    actionsCard: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      borderRadius: 0,
      paddingTop: 8,
      paddingBottom: bottom,
    },
  });

  return styles;
};
