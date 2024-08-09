import { setRemoteDefinitions } from '@microfrontends/load-remote-module';
import('./bootstrap');

fetch('/assets/module-federation.manifest.json')
  .then((res) => res.json())
  .then((definitions) => setRemoteDefinitions(definitions))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
