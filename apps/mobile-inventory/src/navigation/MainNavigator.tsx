import React from 'react';
import { StyleSheet, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, ModuleBoundary } from 'mobile-core';

import { HomeScreenStandaloneWrapper } from './wrappers/HomeScreenStandaloneWrapper';
import { ProductDetailsScreenStandaloneWrapper } from './wrappers/ProductDetailsScreenStandaloneWrapper';

export type MainStackParamList = {
  HomeScreen: undefined;
  InventoryList: undefined;
  ProductDetails: {
    id: string;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList { }
  }
}

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <ModuleBoundary
      badgeText="InventoryModule/MainNavigator"
      color={colors.moduleBoundaries.inventory}>
      <View style={styles.container}>
        <Main.Navigator screenOptions={{ headerShown: false }}>
          <Main.Screen
            name="HomeScreen"
            component={HomeScreenStandaloneWrapper}
          />
          <Main.Screen
            name="ProductDetails"
            component={ProductDetailsScreenStandaloneWrapper}
          />
        </Main.Navigator>
      </View>
    </ModuleBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainNavigator;
