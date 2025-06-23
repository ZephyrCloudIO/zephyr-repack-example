declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;
    ZE_API_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
