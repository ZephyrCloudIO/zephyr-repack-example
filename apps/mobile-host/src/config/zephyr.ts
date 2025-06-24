import {Config} from 'react-native-config';
import {ReactNativeZephyrSdk} from 'react-native-zephyr-sdk';
import {storage} from 'mobile-core';

// console.log('Config.ZE_API_KEY', Config.ZE_API_KEY);

export const zeSdk = new ReactNativeZephyrSdk({
  apiKey:
    Config.ZE_API_KEY ?? 'ze_9262855cdaa39ffe0085390e27c90977a13117c97b80abed',
  // @ts-ignore
  storage,
});
