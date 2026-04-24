import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'host',
  /**
   * EMPTY BECAUSE WE WANT TO HAVE DYNAMIC LOAD
   */
  remotes: [],
};

export default config;
