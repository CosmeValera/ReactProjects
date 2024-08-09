import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/react/module-federation';
import { ModuleFederationConfig } from '@nx/webpack';

import baseConfig from './module-federation.config';

const config: ModuleFederationConfig = {
  ...baseConfig,
};

const coreLibraries = new Set([
  'react',
  'react-dom',
  'react-router-dom',
  '@microfrontends/load-remote-module',
]);

module.exports = withModuleFederation({
  ...config,
  shared: (libraryName, defaultConfig) => {
    if (coreLibraries.has(libraryName)) {
      return {
        ...defaultConfig,
        eager: true,
      };
    }

    // Returning false means the library is not shared.
    return false;
  },
});
