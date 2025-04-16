

declare module 'ZephyrSDK' {
    interface Window {
        ZE_VALUES: {
            RUNTIME_API_URL: string;
        };
        ZE_EDGE_URL: string;
        ZE_APP_UID: string;
        ZE_SNAPSHOT_ID: string;
        MF_CONFIG: Record<string, any>;
        ZE_UPDATED_AT: string;
        ZE_BUILD_ID: string;
    }
    interface Global {
        ZE_VALUES: {
            RUNTIME_API_URL: string;
        };
        ZE_EDGE_URL: string;
        ZE_APP_UID: string;
        ZE_SNAPSHOT_ID: string;
        MF_CONFIG: Record<string, any>;
        ZE_UPDATED_AT: string;
        ZE_BUILD_ID: string;
    }
    type ZE_EDGE_URL = string;
    type ZE_APP_UID = string;
    type ZE_SNAPSHOT_ID = string;
    type MF_CONFIG = Record<string, any>;
    type ZE_UPDATED_AT = string;
    type ZE_BUILD_ID = string;
}

