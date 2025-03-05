import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button} from 'react-native-paper';

import {useOtaVersion} from '../OtaProvider';

type Props = {
  version: string;
  onSelect: (value: string) => void;
};

export default function VersionSelector({version, onSelect}: Props) {
  const contextVersion = useOtaVersion();
  return (
    <View style={styles.row}>
      <Text>Version is: {contextVersion}</Text>
      <Button
        style={version === '1.0' ? styles.selected : styles.normal}
        onPress={() => {
          onSelect('1.0');
        }}>
        1.0
      </Button>
      <Button
        style={version === '2.0' ? styles.selected : styles.normal}
        onPress={() => {
          onSelect('2.0');
        }}>
        2.0
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    gap: 20,
    height: 40,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  selected: {
    color: 'white',
    backgroundColor: 'black',
  },
  normal: {
    color: 'black',
    backgroundColor: 'white',
  },
});
