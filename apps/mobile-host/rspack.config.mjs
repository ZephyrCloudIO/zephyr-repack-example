import * as Repack from '@callstack/repack';
import {RsdoctorRspackPlugin} from '@rsdoctor/rspack-plugin';
import rspack from '@rspack/core';
import {getSharedDependencies} from 'mobile-sdk';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {withZephyr} from 'zephyr-repack-plugin';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USE_ZEPHYR = false; // Boolean(process.env.ZC);

import {RemotesLocal, RemotesV1, RemotesV2} from './mock-zephyr-api.mjs';

/**
 * More documentation, installation, usage, motivation and differences with Metro is available at:
 * https://github.com/callstack/repack/blob/main/README.md
 *
 * The API documentation for the functions and plugins used in this file is available at:
 * https://re-pack.dev
 */

/**
 * Webpack configuration.
 * You can also export a static object or a function returning a Promise.
 *
 * @param env Environment options passed from either Webpack CLI or React Native Community CLI
 *            when running with `react-native start/bundle`.
 */
export default env => {
  const {mode, platform} = env;

  const config = {
    mode,
    context: __dirname,
    entry: './index.js',
    experiments: {
      incremental: mode === 'development',
    },
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'mobile-host',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'MobileHost',
        dts: false,
        // remotes: RemotesLocal, // USE_ZEPHYR ? RemotesV1 : RemotesLocal,
        shared: getSharedDependencies({eager: true}),
        runtimePlugins: [
          path.resolve(__dirname, './src/custom-runtime-plugin.ts'),
        ],
      }),
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
  };

  if (process.env.RSDOCTOR) {
    config.plugins.push(
      new RsdoctorRspackPlugin({
        supports: {
          generateTileGraph: true,
        },
      }),
    );
  }

  // fs.writeFileSync(
  //   path.join(__dirname, `rspack.config.${platform}.json`),
  //   JSON.stringify(config, null, 2),
  //   'utf8',
  // );
  // (async () => {
  //   const after = await withZephyr()(config);
  //   fs.writeFileSync(
  //     path.join(__dirname, `rspack.zephyr.${platform}.json`),
  //     JSON.stringify(after, null, 2),
  //     'utf8',
  //   );
  // })();

  // if (USE_ZEPHYR) {
  //   return withZephyr()(config);
  // }

  return config;
};
