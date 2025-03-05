import {ComponentType, Suspense, lazy} from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import {registerRemotes, loadRemote} from '@module-federation/runtime';
import {Text} from 'react-native';

export type RemoteDetails = {
  scope: string;
  module: string;
};

export async function loadRemoteFromService(scope: string) {
  const remoteMap: Record<string, string> = {
    products: 'http://localhost:4201/mf-manifest.json',
  };

  return Promise.resolve(remoteMap[scope]);
}

export default function useRemote<T = unknown>({
  scope,
  module,
}: RemoteDetails): T {
  const LazyComponent = lazy(async () => {
    const remoteUrl = await loadRemoteFromService(scope);

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
    <ErrorBoundary fallback={<Text>Ut oh!</Text>}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}
