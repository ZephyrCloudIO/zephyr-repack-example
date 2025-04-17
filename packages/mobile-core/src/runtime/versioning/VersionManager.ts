import DeviceInfo from 'react-native-device-info';

import { storageApi } from './versionStorage';

export class VersionManager {
    // return all available versions that we can switch to
    // versions lower than the native version are not compatible
    // TODO: currently mocked, when available, to retrieve from Zephyr API
    getAvailableVersions() {
        return ['1.0', '1.1', '1.2'];
    }

    // this is the version of the native code
    getNativeVersion() {
        return DeviceInfo.getVersion();
    }

    // this is usually equal to latest version, and is different only in case of a rollback
    getActiveVersion = () => {
        // mock, to retrieve from Zephyr API
        return storageApi.getItem('version');
    };

    setActiveVersion = (newActiveVersion: string) => {
        const exists = this.getAvailableVersions().includes(newActiveVersion);
        if (!exists) {
            throw new Error('Version not available');
        }
        return storageApi.setItem('version', newActiveVersion);
    };

    // we should load this version, it is either equal to native version or newer (only JS updates)
    getLatestVersion = () => {
        const latestVersion = this.getAvailableVersions().at(-1);
        if (!latestVersion) {
            throw new Error('No available versions');
        }
        return latestVersion;
    };

    isNativeUpdateAvailable() {
        const currentMajorVersion = +this.getNativeVersion().split('.')[0];
        const latestMajorVersion = +this.getLatestVersion().split('.')[0];
        return currentMajorVersion != latestMajorVersion;
    }
}

export default new VersionManager();
