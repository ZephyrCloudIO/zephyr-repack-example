import type {FederationRuntimePlugin} from '@module-federation/enhanced/runtime';

import {RemotesLocal} from '../mock-zephyr-api.mjs';

function log(eventName: string, obj: Record<string, unknown>) {
  console.log(eventName, JSON.stringify(obj, null, 2));
}

const runtimePlugin: () => FederationRuntimePlugin = () => ({
  name: 'my-runtime-plugin',
  beforeInit(args) {
    console.log('beforeInit', args);
    return args;
  },
  beforeRequest(args) {
    // console.log('beforeRequest', args);
    const inventoryRemote = args.options.remotes.find(
      x => x.alias === 'MobileInventory',
    );
    if (inventoryRemote) {
      // console.log(
      //   '@@@ inventoryRemote',
      //   inventoryRemote,
      //   RemotesLocal.MobileInventory,
      // );
      // inventoryRemote.entry = RemotesLocal.MobileInventory;
    }
    return args;
  },
  afterResolve(args) {
    console.log('afterResolve', args);
    return args;
  },
  onLoad(args) {
    console.log('onLoad: ', args);
    return args;
  },
  async loadShare(args) {
    console.log('loadShare', args);
  },
  async beforeLoadShare(args) {
    console.log('beforeloadShare', args);
    return args;
  },
  errorLoadRemote({id, error, from, origin}) {
    console.log('@@@@ DAMN ERROR', id, error, from, origin);

    const pg = function () {
      console.error(id, 'offline', error);
      return null;
    };

    pg.getInitialProps = function (ctx: any) {
      return {};
    };
    let mod;
    if (from === 'build') {
      mod = () => ({
        __esModule: true,
        default: pg,
        getServerSideProps: () => ({props: {}}),
      });
    } else {
      mod = {
        default: pg,
        getServerSideProps: () => ({props: {}}),
      };
    }

    return mod;
  },
});

export default runtimePlugin;
