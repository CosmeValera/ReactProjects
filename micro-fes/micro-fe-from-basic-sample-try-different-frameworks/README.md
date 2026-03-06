## Trying combining different frameworks

Each one of the projects corresponds to a combination of a React 19 Host, with one of the microfontends.

**Host:**
- React v19

**Microfrontend:**
- Angular 
- Vue.js 
- SolidJS 
- React v18 

**Host (React 19) + Microfrontend:**
- ✅ Angular 
![alt text](image/1.png)
- ✅ Vue.js 
![alt text](image/2.png)
- ❌ SolidJS 
- ❌ React v18 

## Cross framework Module Federation

When combining different frameworks, it's important to have a `RemoteWrapper` file in the Host, and a `mount.ts` file in the Microfrontend. This is because each framework has its own way of rendering and managing its components, so we need a way to bridge the gap between them by sharing the Microfrontend JS code as a DOM element with a JS function.

**Host `RemoteWrapper.jsx`:**
```jsx
import React, { useEffect, useRef } from "react";

export default function RemoteWrapper({ mount }) {
    const containerRef = useRef(null);

    useEffect(() => {
        mount(containerRef.current);
    }, []);

    return <div ref={containerRef} />;
}
```

**Microfrontend `mount.ts`:**
```typescript
import { mount } from "remote/mount";

export default mount;
```

## CJS vs ESM

When importing remotes built with modern tools like Vite (Vue) or newer Angular CLI versions, they output **ESM (ECMAScript Modules)** by default, not the classic global variables that Webpack Module Federation traditionally expects. 

Because of this, the host's `webpack.config.js` cannot use the standard string syntax (`remote@url`), which tries to find a global variable on the `window`. Instead, it must use a `promise import(...)` declaration. This tells Webpack to fetch the remote dynamically using the browser's native module loader and access its exported functions (`get` and `init`) directly.

**CJS way:**
```js
remotes: {
  remote: 'remote@http://localhost:4200/remoteEntry.js',
}
```

**ESM way:**
```js
remotes: {
  remote: `promise import('http://localhost:4200/remoteEntry.js').then(module => ({
    get: module.get,
    init: module.init
  }))`,
}
```
