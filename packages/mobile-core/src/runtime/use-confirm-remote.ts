import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { constants, ze_values, ZE_VALUES, Constants, STORAGE_KEYS, DEFAULT_UPDATE_CONFIG } from "./constants";
import { Snapshot } from "zephyr-edge-contract";
import { Platform } from "react-native";
import { storage } from "../utils/mmkvStorage";
import { UpdateConfig, UpdateProgress } from "./runtime.types";

interface ModuleFederationConfigOptions {
    name: string;
    filename: string;
    version: string;
    remoteType: string;
    remotes: Record<string, string>;
    exposes: Record<string, string>;
    shared: Record<string, string>;
}

interface ModuleFederationPluginOptions {
    config: ModuleFederationConfigOptions;
    deepImports: boolean;
    defaultRuntimePlugins: Array<any>;
}

interface ConfirmUpdateResponse {
    updated: boolean;
    latest_snapshot: Snapshot;
    remote_url?: string;
}

interface ConfirmUpdateOptions {
    tag?: string;
    appName?: string;
    semanticVersion?: string;
}

export class ZephyrRepackSdk {
    private options: any;
    private constants: Constants = constants;
    private ze_edge_url: string = process.env.ZE_EDGE_URL || ZE_EDGE_URL;
    private ze_app_uid: string = process.env.ZE_APP_UID || ZE_APP_UID;
    private ze_snapshot_id: string = process.env.ZE_SNAPSHOT_ID || ZE_SNAPSHOT_ID;
    private runtime_api_url: string = process.env.ZE_EDGE_URL || ZE_EDGE_URL;
    private ze_updated_at: string = process.env.ZE_UPDATED_AT || ZE_UPDATED_AT;
    private ze_build_id: string = process.env.ZE_BUILD_ID || ZE_BUILD_ID;
    private mf_config: ModuleFederationPluginOptions[] = process.env.MF_CONFIG || ZE_MF_CONFIG;
    private pollingInterval: NodeJS.Timeout | null = null;

    constructor() {
        // Initialize storage with default values if not set
        this.initializeStorage();
    }

    private initializeStorage(): void {
        // Initialize update config if not exists
        if (!storage.getString(STORAGE_KEYS.UPDATE_CONFIG)) {
            storage.set(STORAGE_KEYS.UPDATE_CONFIG, JSON.stringify(DEFAULT_UPDATE_CONFIG));
        }

        // Initialize update progress if not exists
        if (!storage.getString(STORAGE_KEYS.UPDATE_PROGRESS)) {
            const initialProgress: UpdateProgress = {
                status: 'idle',
                progress: 0,
                previousVersion: this.ze_build_id,
                currentVersion: this.ze_build_id,
                lastChecked: Date.now()
            };
            storage.set(STORAGE_KEYS.UPDATE_PROGRESS, JSON.stringify(initialProgress));
        }

        // Store the current version as previous version for future reference
        storage.set(STORAGE_KEYS.PREVIOUS_VERSION, this.ze_build_id);
    }

    public getUpdateConfig(): UpdateConfig {
        const configStr = storage.getString(STORAGE_KEYS.UPDATE_CONFIG);
        return configStr ? JSON.parse(configStr) : DEFAULT_UPDATE_CONFIG;
    }

    public setUpdateConfig(config: Partial<UpdateConfig>): void {
        const currentConfig = this.getUpdateConfig();
        const newConfig = { ...currentConfig, ...config };
        storage.set(STORAGE_KEYS.UPDATE_CONFIG, JSON.stringify(newConfig));
        
        // Update polling interval if it's changed
        if (config.pollingInterval && config.pollingInterval !== currentConfig.pollingInterval) {
            this.stopPolling();
            this.startPolling(newConfig.pollingInterval);
        }
    }

    public getUpdateProgress(): UpdateProgress {
        const progressStr = storage.getString(STORAGE_KEYS.UPDATE_PROGRESS);
        if (!progressStr) {
            return {
                status: 'idle',
                progress: 0
            };
        }
        return JSON.parse(progressStr);
    }

    private setUpdateProgress(progress: Partial<UpdateProgress>): void {
        const currentProgress = this.getUpdateProgress();
        const newProgress = { ...currentProgress, ...progress };
        storage.set(STORAGE_KEYS.UPDATE_PROGRESS, JSON.stringify(newProgress));
    }

    public getPreviousVersion(): string | null {
        return storage.getString(STORAGE_KEYS.PREVIOUS_VERSION);
    }

    public startPolling(interval?: number): void {
        this.stopPolling();
        
        const config = this.getUpdateConfig();
        const pollingMs = interval || config.pollingInterval;
        
        // Immediate check
        this.checkForUpdate();
        
        // Start polling
        this.pollingInterval = setInterval(() => {
            this.checkForUpdate();
        }, pollingMs);
    }

    public stopPolling(): void {
        if (this.pollingInterval) {
            clearInterval(this.pollingInterval);
            this.pollingInterval = null;
        }
    }

    private async checkForUpdate(): Promise<ConfirmUpdateResponse | null> {
        try {
            this.setUpdateProgress({ 
                status: 'checking',
                lastChecked: Date.now()
            });

            const response = await fetch(`${this.runtime_api_url}${this.constants.confirm_update}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'x-ze-app-uid': this.ze_app_uid,
                    'x-ze-build-id': this.ze_build_id,
                    'x-ze-updated-at': this.ze_updated_at,
                }
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const data: ConfirmUpdateResponse = await response.json();
            
            if (data.updated) {
                // Create remote URL
                const remoteUrl = this.buildRemoteUrl(data.latest_snapshot);
                
                this.setUpdateProgress({
                    status: 'ready',
                    progress: 100,
                    currentVersion: data.latest_snapshot.id,
                    remoteUrl
                });
                
                // Add remote URL to the response
                data.remote_url = remoteUrl;
            } else {
                this.setUpdateProgress({
                    status: 'idle',
                    progress: 0
                });
            }
            
            return data;
        } catch (error) {
            console.error('Failed to check for update:', error);
            this.setUpdateProgress({
                status: 'error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
            return null;
        }
    }

    private buildRemoteUrl(snapshot: Snapshot): string {
        // Construct remote URL based on the snapshot and platform
        const platform = Platform.OS;
        const baseUrl = this.runtime_api_url;
        
        return `${baseUrl}${this.constants.load_remote}/${snapshot.id}/${platform}`;
    }

    public async confirmUpdate(options: ConfirmUpdateOptions): Promise<ConfirmUpdateResponse | null> {
        // Record previous version if not already set
        const previousVersion = this.getPreviousVersion();
        if (!previousVersion) {
            storage.set(STORAGE_KEYS.PREVIOUS_VERSION, this.ze_build_id);
        }
        
        // Check for update
        return this.checkForUpdate();
    }

    public async fetchLatestRemoteUrl(): Promise<string | null> {
        // First check if we already have a cached URL
        const progress = this.getUpdateProgress();
        if (progress.status === 'ready' && progress.remoteUrl) {
            return progress.remoteUrl;
        }
        
        // Otherwise, check for update and get URL
        const updateResult = await this.checkForUpdate();
        if (updateResult?.updated && updateResult.remote_url) {
            return updateResult.remote_url;
        }
        
        return null;
    }

    public normalizeMfConfig(mf_config: ModuleFederationPluginOptions[]) {
        const normalizedMfConfig = {
            name: mf_config[0].config.name,
            filename: mf_config[0].config.filename,
            version: mf_config[0].config.version,
            remoteType: mf_config[0].config.remoteType,
            remotes: mf_config[0].config.remotes,
            exposes: mf_config[0].config.exposes,
            shared: mf_config[0].config.shared,
        }
        console.log('mf_config[0].config.name', mf_config[0].config.name)
        console.log('mf_config[0].config.remotes', mf_config[0].config.remotes)

        return normalizedMfConfig;
    }

    public verifyValues() {
        console.table({
            constants: this.constants,
            ze_edge_url: this.ze_edge_url,
            ze_app_uid: this.ze_app_uid,
            ze_snapshot_id: this.ze_snapshot_id,
            runtime_api_url: this.runtime_api_url,
            ze_updated_at: this.ze_updated_at,
            ze_build_id: this.ze_build_id,
            mf_config: JSON.stringify(this.mf_config, null, 2)
        });
        console.dir(this.normalizeMfConfig(this.mf_config), { depth: null });
    }
}