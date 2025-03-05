import {ComponentType, lazy, Suspense} from 'react';
import {ActivityIndicator} from 'react-native';

import {loadRemote, registerRemotes} from '@module-federation/runtime';

import ErrorBoundary from './components/ErrorBoundary';

export type RemoteProps = {
  scope: string;
  module: string;
  version: string;
};

export default async function loadRemoteFromService(scope: string) {
  // TODO: add some mapping from mock-zephyr-api
  return 'http://localhost:9001/ios/mf-manifest.json';
}

export async function RemoteComponent({
  scope,
  module,
  version,
  ...props
}: RemoteProps) {
  console.log('@@@ 1. entering use remote', {scope, module, version});

  const LazyComponent = lazy(async () => {
    console.log('@@@@ 3. chilling');
    const remoteUrl = await loadRemoteFromService(scope);
    console.log('@@@@ 4. yeah', {scope, module, version, remoteUrl});
    registerRemotes({
      name: scope,
      entry: remoteUrl,
    });

    return loadRemote(`${scope}/${module}`) as Promise<{
      default: ComponentType<unknown>;
    }>;
  });

  console.log('@@@ 2. returning');

  return (
    <ErrorBoundary name={module}>
      <Suspense fallback={<ActivityIndicator />}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
