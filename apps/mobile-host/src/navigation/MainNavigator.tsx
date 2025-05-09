import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors, SignInScreen, useAuthStore} from 'mobile-core';

import LazyLoadedProductDetailsScreen from '../screens/LazyLoadedProductDetailsScreen';
import TabsNavigator from './TabsNavigator';

export type MainStackParamList = {
  Login: undefined;
  Main: undefined;
  ProductDetails: {productId: string};
};

const Main = createNativeStackNavigator<MainStackParamList>();
const MainNavigator = () => {
  const {user} = useAuthStore();

  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
        headerTintColor: colors.grayscale.darkGray,
        headerTransparent: true,
      }}>
      <Main.Screen name="Main" component={TabsNavigator} />
      <Main.Screen
        name="ProductDetails"
        component={LazyLoadedProductDetailsScreen}
      />
      {user ? null : (
        <Main.Screen
          name="Login"
          component={SignInScreen}
          options={{headerShown: true, title: ''}}
        />
      )}
    </Main.Navigator>
  );
};

export default MainNavigator;
