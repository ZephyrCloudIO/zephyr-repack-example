import {StorageApi} from '@callstack/repack/client';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'zephyr-storage',
});

export const MmkvStorage: StorageApi = {
  setItem: (name, value) => {
    return Promise.resolve(storage.set(name, value));
  },
  getItem: name => {
    const value = storage.getString(name);
    return Promise.resolve(value ?? null);
  },
  removeItem: name => {
    return Promise.resolve(storage.delete(name));
  },
};
