import React from 'react';
import {StyleSheet, View} from 'react-native';

import {init, registerRemotes} from '@module-federation/runtime';
import {Button, Icon, Text} from 'react-native-paper';

import mfConfig from '../../../../../apps/mobile-host/module-federation.config.v1.mjs';
import {useTheme} from '../hooks';
import {ModuleBoundary} from './ModuleBoundary';

type Props = {
  icon: string;
  title: string;
  boundaryColor: string;
};

export function EmptyScreen({icon, title, boundaryColor}: Props) {
  const theme = useTheme();

  const switchRemotes = () => {
    // global.window.location = {
    //   href: '', //  window.location.href returns the href (URL) of the current page
    //   hostname: '', //window.location.hostname returns the domain name of the web host
    //   pathname: '', //window.location.pathname returns the path and filename of the current page
    //   protocol: 'https', //window.location.protocol returns the web protocol used (http: or https:)
    //   assign: null, //window.location.assign loads a new document
    // };
    registerRemotes(
      [
        {
          name: 'MobileInventory',
          version: '1.0',
          entry:
            'https://boris-yankov-jfrpliow5v-138-mobileinventory-zephy-521bff6e6-ze.zephyrcloud.app/mf-manifest.json',
        },
      ],
      {force: true},
    );
    //
    // init({...mfConfig, force: true});
  };

  return (
    <ModuleBoundary withTopRadius color={boundaryColor}>
      <View
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <Button onPress={switchRemotes}>Switch Remotes</Button>
        {/* <Icon source={icon} size={100} />
        <Text style={styles.title} variant="titleLarge">
          {title}
        </Text> */}
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
