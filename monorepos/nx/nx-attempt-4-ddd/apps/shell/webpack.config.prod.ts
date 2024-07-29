import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/react/module-federation';
import { ModuleFederationConfig } from '@nx/webpack';
import baseConfig from './module-federation.config';
import CompilationMessagePlugin from './compilation-plugin';

const prodConfig: ModuleFederationConfig = {
  ...baseConfig,
  remotes: [
    ['shop', 'http://localhost:4201/'],
    ['cart', 'http://localhost:4202/'],
  ],
};

export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(prodConfig),
  (config) => {
    config.plugins.push(new CompilationMessagePlugin());
    return config;
  }
);
