import {Config} from 'react-native-config';
import {ReactNativeZephyrSdk} from 'react-native-zephyr-sdk';
import {storage} from './storage';

export const zeSdk = new ReactNativeZephyrSdk({
  apiKey: Config.ZE_API_KEY as string,
  storage,
});
