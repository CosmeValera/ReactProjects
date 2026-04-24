import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'blog',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
