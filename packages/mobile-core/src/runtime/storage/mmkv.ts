import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export class MmkvStorageWrapper implements Storage {
    private storage: MMKV;

    constructor(storage: MMKV) {
        this.storage = storage;
    }

    setItem(name: string, value: string) {
        this.storage.set(name, value);
    }

    getItem(name: string): string | null {
        return this.storage.getString(name) ?? null;
    }

    removeItem(name: string) {
        this.storage.delete(name);
    }

    clear() {
        this.storage.clearAll();
    }

    listKeys() {
        return this.storage.getAllKeys();
    }
}

export type Storage = StateStorage & {
    clear: () => void;
};

export const createMmkvInstance = (instanceId: string) => {
    return new MMKV({ id: instanceId });
};
