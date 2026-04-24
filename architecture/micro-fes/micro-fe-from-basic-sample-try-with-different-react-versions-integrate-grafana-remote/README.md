# Module Federation: React 18 Remote inside a React 19 Host

## Context

`@grafana/ui` hasn't updated to React 19 yet, so the Grafana MFE must run
React 18 in isolation while the host runs React 19. Module Federation's
`singleton` + `mount` pattern makes this possible.

---

## Remote Setup (Grafana MFE — React 18)

### 1. Webpack config: expose `Main.jsx` and isolate React
```js
new ModuleFederationPlugin({
  name: "grafana_mfe",        // ← this name matters (see Host step 2)
  filename: "remoteEntry.js",
  exposes: {
    "./GrafanaApp": "./src/Main.jsx",
    // ...other exposes
  },
  shared: {
    react:     { singleton: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
  },
}),
```

Marking `react`/`react-dom` as `singleton: true` ensures the remote uses its
**own bundled React 18**, fully isolated from the host's React 19.

---

### 2. `Main.jsx`: export a `mount` function, no side effects
```jsx
export function mount(el) {
  const root = createRoot(el); // React 18's createRoot
  root.render(<App />);
  return root;                 // return so host can call root.unmount()
}

export default App;
// ❌ No auto-bootstrap here — no side effects at module load time
```

The `mount` function is the bridge: the host gives it a DOM node and the
remote bootstraps its own isolated React 18 tree into it.

---

### 3. Async boundary for standalone dev (`index.js` + `bootstrap.js`)

**`index.js`**
```js
import("./bootstrap.js"); // dynamic import creates the async boundary
```

**`bootstrap.js`**
```js
import { mount } from "./Main.jsx";
mount(document.getElementById("app"));
```

The dynamic `import()` in `index.js` gives webpack time to negotiate all
shared/federated modules before any code executes. Without this, `mount`
is called before React is ready and nothing renders.

---

## Host Setup (React 19)

### 1. Webpack config: reference the remote by its `name`
```js
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    grafana_remote: "grafana_mfe@http://localhost:3001/remoteEntry.js",
    //               ^^^^^^^^^^ must match `name` in the remote's config
    //                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ URL to remoteEntry.js
  },
  shared: {
    // Share all deps EXCEPT react and react-dom
    // so the remote can use its own isolated React 18
    ...Object.fromEntries(
      Object.entries(deps).filter(
        ([key]) => key !== "react" && key !== "react-dom"
      )
    ),
  },
}),
```

The string format is `"<remote_name>@<url>"`:
- The part **before** `@` must match the remote's `name` field.
- The part **after** `@` is the URL to the remote's `remoteEntry.js`.
- The import key (`grafana_remote`) is what you use as the import prefix in your code.

---

### 2. `GrafanaWrapper.jsx`: call `mount` into a ref
```jsx
import { mount } from "grafana_remote/GrafanaApp";
//                    ^^^^^^^^^^^^^^  matches remotes key in host webpack
//                                   ^^^^^^^^^^^^ matches exposes key in remote webpack

export default function GrafanaWrapper() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const root = mount(ref.current);
    return () => root.unmount(); // cleanup on unmount
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}
```

---

### 3. Async boundary for the host too (`index.js` + `bootstrap.js`)

The host needs the same async boundary pattern as the remote, so webpack can
finish loading `remoteEntry.js` from the remote before the React tree renders.

**`index.js`**
```js
import("./bootstrap.js");
```

**`bootstrap.js`**
```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import AppHost from "./AppHost";

const root = createRoot(document.getElementById("app"));
root.render(<AppHost />);
```

---

## Mental Model
```
Host (React 19)
└── index.js  →  import("./bootstrap.js")   ← async boundary
    └── bootstrap.js  →  createRoot + render AppHost
        └── AppHost
            └── GrafanaWrapper (ref + useEffect)
                └── mount(ref.current)       ← hands off a DOM node
                    └── Remote (React 18)
                        └── createRoot(el)   ← isolated React 18 tree
                            └── GrafanaProvider
                                └── GrafanaPanels
                                    ├── GrafanaRefresh
                                    ├── GrafanaTimeRange
                                    └── GrafanaRemote (iframes)
```

---

## Key Takeaways

| Rule | Why |
|------|-----|
| Remote `name` must match the string before `@` in host's `remotes` | webpack uses it to locate the correct container |
| `singleton: true` on `react`/`react-dom` in the **remote** | isolates React 18 from the host's React 19 |
| Do NOT share `react`/`react-dom` in the **host** | prevents version conflict / allows isolation |
| Export a `mount(el)` function, never auto-bootstrap in `Main.jsx` | prevents the remote from hijacking the host's `#app` on module load |
| Both host and remote need `index.js → import("./bootstrap.js")` | async boundary lets webpack resolve all federated modules before code runs |