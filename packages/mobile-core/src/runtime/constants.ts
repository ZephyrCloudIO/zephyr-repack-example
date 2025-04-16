export const getGlobalObject = () => {
    if (typeof global !== 'undefined') {
        return global as unknown as Global;
    }
    if (typeof (globalThis as any).window !== 'undefined') {
        return (globalThis as any).window as unknown as Global;
    }
    if (typeof (globalThis as any).global !== 'undefined') {
        return (globalThis as any).global as unknown as Global;
    }
    // another type of global in react native being navigator
    if (typeof (globalThis as any).navigator !== 'undefined') {
        return (globalThis as any).navigator as unknown as Global;
    }
    return {} as Global;
};

export const ze_values = {
    RUNTIME_API_URL: getGlobalObject().ZE_EDGE_URL || 'https://ze-runtime.zephyrcloud.app',
    APP_UID: getGlobalObject().ZE_APP_UID || '',
    SNAPSHOT_ID: getGlobalObject().ZE_SNAPSHOT_ID || '',
    MF_CONFIG: getGlobalObject().MF_CONFIG || {},
    ZE_UPDATED_AT: getGlobalObject().ZE_UPDATED_AT || '',
    ZE_BUILD_ID: getGlobalObject().ZE_BUILD_ID || '',
}

export type ZE_VALUES = typeof ze_values;

export const constants = {
    confirm_update: '/confirm-update',
    update_status: '/update-status',
    load_remote: '/load-remote',
}

export type Constants = typeof constants;