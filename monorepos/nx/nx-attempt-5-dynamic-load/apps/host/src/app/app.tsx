import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';

const Cart = React.lazy(() => import('cart/Module'));

const Blog = React.lazy(() => import('blog/Module'));

const Shop = React.lazy(() => import('shop/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/cart">Cart</Link>
        </li>

        <li>
          <Link to="/blog">Blog</Link>
        </li>

        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="host" />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/shop" element={<Shop />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
