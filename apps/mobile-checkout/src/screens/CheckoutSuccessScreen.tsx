import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {
  Button,
  colors,
  ModuleBoundary,
  Text,
  useTranslation,
  VStack,
} from 'mobile-core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  onDismiss: () => void;
};

const CheckoutSuccessScreen = ({ onDismiss }: Props) => {
  const { t } = useTranslation('checkout');
  const { top } = useSafeAreaInsets();

  const text1Opacity = useRef(new Animated.Value(0)).current;
  const text2Opacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(text1Opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(text2Opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [text1Opacity, text2Opacity, buttonOpacity]);

  // Play animation every time the user land on this screen from navigation
  useFocusEffect(
    useCallback(() => {
      if (lottieRef.current) {
        lottieRef.current.reset();
        lottieRef.current.play();
      }
    }, []),
  );

  return (
    <ModuleBoundary
      badgeText="CheckoutModule/CheckoutSuccessScreen"
      withBottomRadius
      withTopRadius
      color={colors.moduleBoundaries.checkout}>
      <VStack style={[styles.container, { marginTop: top }]}>
        <View />
        <VStack style={styles.textsWrapper}>
          <Animated.View style={{ opacity: text1Opacity }}>
            <Text variant="headlineLarge" style={styles.text1}>
              {t('checkout_success_title')}
            </Text>
          </Animated.View>
          <Animated.Text style={{ opacity: text2Opacity }}>
            <Text variant="bodyLarge" style={styles.text2}>
              {t('checkout_success_message')}
            </Text>
          </Animated.Text>
        </VStack>
        <LottieView
          ref={lottieRef}
          speed={0.5}
          source={require('../assets/animations/confetti.json')}
          style={styles.animation}
          resizeMode="cover"
          loop={false}
        />
        <Animated.View style={[styles.button, { opacity: buttonOpacity }]}>
          <Button
            testID="checkoutSuccessScreen.goHomeButton"
            mode="contained"
            labelStyle={styles.buttonLabel}
            onPress={onDismiss}>
            {t('checkout_success_button')}
          </Button>
        </Animated.View>
      </VStack>
    </ModuleBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  textsWrapper: {
    rowGap: 8,
  },
  text1: {
    fontSize: 34,
    textAlign: 'center',
  },
  text2: {
    textAlign: 'center',
  },
  button: {
    marginBottom: 16,
  },
  buttonLabel: {
    textTransform: 'uppercase',
    fontFamily: Platform.select({
      ios: 'Mulish Bold',
      android: 'mulishbold',
    }),
  },
  animation: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default CheckoutSuccessScreen;
