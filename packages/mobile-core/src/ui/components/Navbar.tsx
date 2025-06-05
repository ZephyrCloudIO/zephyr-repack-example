import React from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';

type Props = {
  rightSection?: () => React.ReactNode;
  leftSection?: () => React.ReactNode;
  testID?: string;
};

export function Navbar({rightSection, leftSection, testID}: Props) {
  return (
    <View testID={testID} style={styles.container}>
      <Image
        accessibilityIgnoresInvertColors
        source={Platform.select({
          ios: require('../../assets/zephyr_banner.png'),
          android: require('../../assets/zephyr_banner_android.png'),
        })}
        style={styles.banner}
      />
      <View style={styles.leftSection}>{leftSection?.()}</View>
      <View style={styles.rightSection}>{rightSection?.()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  banner: {
    height: Platform.select({ios: 90, android: 60}),
    width: 500,
  },
  leftSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  rightSection: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
