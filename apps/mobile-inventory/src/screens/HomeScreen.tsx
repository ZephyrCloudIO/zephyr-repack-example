import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import {
  ActivityIndicator,
  colors,
  ModuleBoundary,
  Navbar,
  useProducts,
  useResponsiveSizes,
} from 'mobile-core';

import HomeProduct from '../components/HomeProduct';

type Props = {
  onProductPress: (productId: string) => void;
};

const HomeScreen = ({ onProductPress }: Props) => {
  const styles = useStyles();

  const { data, isLoading } = useProducts();

  return (
    <ModuleBoundary
      withTopRadius
      badgeText="InventoryModule/HomeScreen"
      badgePosition={{ bottom: '2%', left: '40%' }}
      color={colors.moduleBoundaries.inventory}>
      <View style={styles.container}>
        <Navbar testID="homeScreen.navbar" />

        <FlatList
          testID="homeScreen.productsList"
          style={styles.listContainer}
          contentContainerStyle={styles.contentContainer}
          data={data}
          numColumns={2}
          keyExtractor={item => item.id}
          ListEmptyComponent={() => {
            if (isLoading) {
              return (
                <View style={styles.loadingIndicatorWrapper}>
                  <ActivityIndicator size="large" />
                </View>
              );
            }

            return null;
          }}
          renderItem={({ item, index }) => (
            <HomeProduct
              testID={`homeScreen.productsListItem.${index}`}
              item={item}
              onPress={() => onProductPress(item.id)}
            />
          )}
        />
      </View>
    </ModuleBoundary>
  );
};
const useStyles = () => {
  const { rem } = useResponsiveSizes();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listContainer: {
      paddingTop: 16,
    },
    contentContainer: {
      alignItems: 'center',
    },
    loadingIndicatorWrapper: {
      padding: rem(64),
    },
  });

  return styles;
};

export default HomeScreen;
