import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Text } from 'react-native-paper';

import { useTheme } from '../hooks';
import { ModuleBoundary } from './ModuleBoundary';

type Props = {
  icon: string;
  title: string;
  boundaryColor: string;
};

export function EmptyScreen({ icon, title, boundaryColor }: Props) {
  const theme = useTheme();

  return (
    <ModuleBoundary
      hidden={true}
      withTopRadius
      color={boundaryColor}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Icon source={icon} size={100} />
        <Text style={styles.title} variant="titleLarge">
          {title}
        </Text>
      </View>
    </ModuleBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 16,
  },
});
