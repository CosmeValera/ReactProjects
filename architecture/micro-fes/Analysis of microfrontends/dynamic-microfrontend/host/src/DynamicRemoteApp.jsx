// src/DynamicRemoteApp.jsx
import React, {Suspense} from "react";

const moduleMap = {
  "remote/MainRemote": () => import("remote/MainRemote"),
  "remote/SecondaryRemote": () => import("remote/SecondaryRemote")
  // Add other modules here if needed
};

export default function DynamicRemoteApp({ name }) {
  const RemoteAppComponent = React.lazy(() => {
    const moduleLoader = moduleMap[name];
    if (!moduleLoader) {
      return Promise.reject(new Error(`Unknown remote module: ${name}`));
    }
    return moduleLoader();
  });

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RemoteAppComponent />
    </Suspense>
  );
}
