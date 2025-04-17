import { createMmkvInstance, MmkvStorageWrapper } from '@sgws/mobile-storage';

export const storage = createMmkvInstance('versioning');
export const storageApi = new MmkvStorageWrapper(storage);
