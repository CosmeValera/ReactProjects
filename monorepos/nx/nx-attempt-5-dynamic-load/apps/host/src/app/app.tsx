import * as React from 'react';

import { loadRemoteModule } from '@microfrontends/load-remote-module';

const Cart = React.lazy(() => loadRemoteModule('cart', './Module'));

const Blog = React.lazy(() => loadRemoteModule('blog', './Module'));

const Shop = React.lazy(() => loadRemoteModule('shop', './Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <p>HOST</p>

      <Cart />
      <Blog />
      <Shop />

    </React.Suspense>
  );
}

export default App;
