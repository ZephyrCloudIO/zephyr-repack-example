import {AppRegistry} from 'react-native';
import {ScriptManager} from '@callstack/repack/client';
import {MmkvStorage} from 'mobile-core';
import {name as appName} from './app.json';
import App from './src/App';
import {preloadRemote, registerRemotes} from '@module-federation/runtime';

const remoteName = 'MobileInventory';
const remoteEntry =
  'http://lois-10-mobileinventory-zephyr-repack-example-zep-1d1b5315b-ze.zephyr.local/MobileInventory.container.js.bundle';

registerRemotes(
  [
    {
      name: remoteName,
      entry: remoteEntry,
    },
  ],
  {force: true},
);

ScriptManager.shared.setStorage(MmkvStorage);

// preload eagerly on startup
// you can kill the dev server before going to the mini app screen
// and it will still work because of the assets being present in cache
ScriptManager.shared
  // invalidate cache to make sure we fetch the latest assets
  .invalidateScripts()
  // preload the MiniApp remote entry and all its assets
  .then(() => {
    return preloadRemote([
      {
        nameOrAlias: 'MobileInventory',
        resourceCategory: 'sync',
        depsRemote: false,
      },
    ]);
  })
  .then(() => {
    console.log('preloaded MiniApp assets');
  })
  .catch(e => {
    // preloadRemote will fail if the remote entry is not a manifest
    console.error('error preloading MiniApp assets');
    console.error(e);
  });

ScriptManager.shared.on('prefetching', script => {
  console.debug('prefetching', script.locator.uniqueId);
});

AppRegistry.registerComponent(appName, () => App);
