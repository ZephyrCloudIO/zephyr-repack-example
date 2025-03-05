// ./src/App.tsx
import React from 'react';
import {createRemoteComponent} from '@module-federation/bridge-react';
import {loadRemote} from '@module-federation/enhanced/runtime';
import styles from './index.module.less';

// define FallbackErrorComp Component
const FallbackErrorComp = (info: any) => {
  return (
    <div>
      <h2>This is ErrorBoundary Component</h2>
      <p>Something went wrong:</p>
      <pre style={{color: 'red'}}>{info?.error.message}</pre>
      <button onClick={() => info.resetErrorBoundary()}>
        resetErrorBoundary(try again)
      </button>
    </div>
  );
};

// define FallbackLoading Component
const FallbackComp = <div data-test-id="loading">loading...</div>;

// use createRemoteComponent to export remote component
const Remote1App = createRemoteComponent({
  // loader is for loading remote module, for example: loadRemote('remote1/export-app')、import('remote1/export-app')
  loader: () => loadRemote('remote1/export-app'),
  // fallback 用于在加载远程模块失败时展示的组件
  // fallback is for error handling
  fallback: FallbackErrorComp,
  // loading is for loading state
  loading: FallbackComp,
});

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" Component={Home} />
        <Route
          path="/remote1/*"
          // use Remote1App component, will be lazy loaded
          Component={() => (
            <Remote1App
              // can set className and style, will be injected to component
              className={styles.remote1}
              style={{color: 'red'}}
              // name and age are remote component props, will be passed to remote component
              name={'Ming'}
              age={12}
              // can set ref, will be forwarded to remote component, can get ref object to operate dom
              ref={ref}
            />
          )}
        />
      </Routes>
    </BrowserRouter>
  );
};
