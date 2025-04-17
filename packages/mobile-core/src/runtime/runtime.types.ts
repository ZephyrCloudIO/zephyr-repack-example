

export interface UpdateConfig {
    pollingInterval: number; // in milliseconds
    autoUpdate: boolean;
}

export interface UpdateProgress {
    status: 'idle' | 'checking' | 'downloading' | 'ready' | 'error';
    progress: number; // 0-100
    previousVersion?: string;
    currentVersion?: string;
    error?: string;
    lastChecked?: number; // timestamp
    remoteUrl?: string;
}

declare global {
    interface Window {
        ZE_VALUES: {
            RUNTIME_API_URL: string;
        };
        ZE_EDGE_URL: string;
        ZE_APP_UID: string;
        ZE_SNAPSHOT_ID: string;
        ZE_MF_CONFIG: Record<string, any>;
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
        ZE_MF_CONFIG: Record<string, any>;
        ZE_UPDATED_AT: string;
        ZE_BUILD_ID: string;
    }
    type ZE_EDGE_URL = string;
    type ZE_APP_UID = string;
    type ZE_SNAPSHOT_ID = string;
    type ZE_MF_CONFIG = Record<string, any>;
    type ZE_UPDATED_AT = string;
    type ZE_BUILD_ID = string;
}

