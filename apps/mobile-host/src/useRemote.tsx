import {ComponentType, lazy, Suspense} from 'react';

import {loadRemote, registerRemotes} from '@module-federation/runtime';

import {RemotesLocal, RemotesV1, RemotesV2} from '../mock-zephyr-api.mjs';
import ErrorBoundary from './components/ErrorBoundary';
import Placeholder from './components/Placeholder';
import {useVersion} from './VersionProvider';

export type RemoteDetails = {
  scope: string;
  module: string;
};

const remoteMap: Record<string, Record<string, string>> = {
  default: RemotesLocal,
  '1.0': RemotesV1,
  '2.0': RemotesV2,
};

export async function loadRemoteFromService(scope: string, version: string) {
  console.log(
    '@@@@ loadRemoteFromService',
    remoteMap,
    scope,
    version,
    remoteMap[version][scope],
  );

  return Promise.resolve(remoteMap[version][scope]);
}

export default function useRemote<T = unknown>({
  scope,
  module,
}: RemoteDetails): T {
  const version = useVersion();
  const LazyComponent = lazy(async () => {
    const remoteUrl = await loadRemoteFromService(scope, version);

    registerRemotes([
      {
        name: scope,
        entry: remoteUrl,
      },
    ]);

    return loadRemote<T>(`${scope}/${module}`) as unknown as Promise<{
      default: ComponentType<T>;
    }>;
  });

  //@ts-expect-error
  return (props: any) => (
    <ErrorBoundary name={module}>
      <Suspense fallback={<Placeholder />}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
