import {MmkvStorageWrapper} from '../storage/mmkv';
import {createMmkvInstance} from '../storage/mmkv';

export const storage = createMmkvInstance('versioning');
export const storageApi = new MmkvStorageWrapper(storage);
