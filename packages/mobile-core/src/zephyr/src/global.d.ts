declare global {
  // Override Node.js timer types for React Native compatibility
  function setInterval(callback: () => void, ms: number): number;
  function setTimeout(callback: () => void, ms: number): number;
  function clearInterval(id: number): void;
  function clearTimeout(id: number): void;

  // namespace NodeJS {
  //     interface ProcessEnv {
  //         ZE_EDGE_URL: string;
  //         ZE_APP_UID: string;
  //         ZE_SNAPSHOT_ID: string;
  //         ZE_UPDATED_AT: string;
  //         ZE_BUILD_ID: string;
  //         MF_CONFIG: string;
  //     }
  // }

  const ZE_EDGE_URL: string;
  const ZE_APP_UID: string;
  const ZE_SNAPSHOT_ID: string;
  const ZE_UPDATED_AT: string;
  const ZE_BUILD_ID: string;
  const ZE_MF_CONFIG: {
    config: {
      name: string;
      library: { type: any };
      remotes: { [key: string]: any };
      exposes: { [key: string]: any };
    };
  }[];
  const ZE_NATIVE_VERSION: string;
}

export {};
