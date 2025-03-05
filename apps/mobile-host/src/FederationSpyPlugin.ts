import type {ScriptLocator, StorageApi} from '@callstack/repack/client';
// import type {FederationRuntimePlugin} from '@module-federation/enhanced/runtime';
import type {
  FederationRuntimePlugin,
  RemoteInfo,
} from '@module-federation/runtime/types';

// TODO: Check if something stored in MMKV
// if not, ignore
// if yes, use that, re-generate remote URLs

const FederationSpyPlugin = (): FederationRuntimePlugin => ({
  name: 'federation-ota-plugin',
  beforeInit: args => {
    console.log('beforeInit', args);
    const {id, userOptions, options, origin} = args;
    const remote = options.remotes.find(x => x.name === id);
    if (!remote) {
      return args;
    }
    console.log('beforeInit', {userOptions, options, origin});
    // remote.entry = "htttp://localhost:4201/mf-manifest.json";
    return {userOptions, options, origin};
  },
  init: async ({options, origin}) => {
    console.log('init', {options, origin});
  },
  loadEntry: async ({remoteInfo}) => {
    const {entry, entryGlobalName} = remoteInfo;

    console.log(remoteInfo);

    // @ts-ignore
    return globalThis[entryGlobalName];
  },
  afterResolve: (args: {remoteInfo: RemoteInfo}) => {
    return args;
  },
});

export default FederationSpyPlugin;
