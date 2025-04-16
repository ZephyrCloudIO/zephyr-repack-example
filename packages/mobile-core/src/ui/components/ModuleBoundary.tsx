import React, { ReactNode } from 'react';
import { ColorValue, Platform, StyleSheet, View, Text, ViewStyle } from 'react-native';

import { useModuleBoundaryStore } from '../../utils';

const getCornerRadius = Platform.select({
  ios: () => require('react-native-screen-corner-radius').ScreenCornerRadius,
  default: () => 0,
});

export const ModuleBoundary = ({
  color,
  withTopRadius = false,
  withBottomRadius = false,
  children,
  hidden = false,
  badgeText = 'Module Boundary',
  badgePosition = { bottom: '20%', left: '10%' },
}: {
  children: ReactNode;
  color: ColorValue;
  withTopRadius?: boolean;
  withBottomRadius?: boolean;
  badgeText?: string;
  hidden?: boolean;
  badgePosition?: {
    bottom?: string | number;
    left?: string | number;
    top?: string | number;
    right?: string | number;
  };
}) => {
  const { isEnabled } = useModuleBoundaryStore();

  if (!isEnabled || !React.isValidElement(children) || hidden) {
    return children;
  }

  const badgePositionStyle = StyleSheet.flatten(badgePosition) as ViewStyle;

  return (
    <View style={styles.container}>
      <View style={[styles.badgeView, badgePositionStyle, { backgroundColor: color }]}>
        <Text style={styles.badgeText}>{badgeText}</Text>
      </View>
      <View
        pointerEvents="none"
        style={[
          styles.borderView,
          {
            borderColor: color,
          },
          withTopRadius && styles.topRadius,
          withBottomRadius && styles.bottomRadius,
        ]}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderView: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 900,
    width: '100%',
    height: '100%',
    borderWidth: 4,
    borderStyle: 'dotted',
  },
  badgeView: {
    position: 'absolute',
    zIndex: 1000,
    width: 'auto',
    // backgroundColor: '#B0045F',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    boxShadow: '0 0 10px 0 rgba(185, 185, 185, 0.5)',
    padding: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  topRadius: {
    borderTopLeftRadius: getCornerRadius(),
    borderTopRightRadius: getCornerRadius(),
  },
  bottomRadius: {
    borderBottomLeftRadius: getCornerRadius(),
    borderBottomRightRadius: getCornerRadius(),
  },
});
