import React from "react";
import { createRoot } from "react-dom/client";
import GrafanaTimeRange from "./components/GrafanaTimeRange";
import GrafanaRefresh from "./components/GrafanaRefresh";
import GrafanaRemote from "./components/GrafanaRemote";
import "./index-mfe-only.css";
import mainStyles from "./Main.module.css";
import { GrafanaProvider, useGrafanaContext } from "./GrafanaContext";

const GrafanaPanels = () => {
  const { currentView, updateCurrentView } = useGrafanaContext();

  return (
    <div className={mainStyles.panelsContainer}>
      <div className={mainStyles.controlsContainer}>
        <GrafanaRefresh 
          updateCurrentView={updateCurrentView} 
          currentView={currentView} 
        />
        <GrafanaTimeRange 
          updateCurrentView={updateCurrentView} 
          currentView={currentView} 
        />
      </div>
      <div className={mainStyles.panelContainer}>
        <h2 className={mainStyles.grafanaHeader}>Grafana Panel One</h2>
        <div style={{ flex: 1, position: 'relative', height: '100%' }}>
          <GrafanaRemote 
            src="http://localhost:6060/d-solo/fdmjva7j6u9z4c/demo-db?orgId=1&from=1716428249431&to=1716447799545&panelId=1" 
            width="100%" 
            height="100%" 
            name="Grafana Panel One" 
            currentView={currentView} 
            panelId={1}
          />
        </div>
      </div>
      <div className={mainStyles.panelContainer}>
        <h2 className={mainStyles.grafanaHeader}>Grafana Panel Two</h2>
        <div style={{ flex: 1, position: 'relative', height: '100%' }}>
          <GrafanaRemote 
            src="http://localhost:6060/d-solo/fdmjva7j6u9z4c/demo-db?orgId=1&from=1716428249431&to=1716447799545&panelId=2" 
            width="100%" 
            height="100%" 
            name="Grafana Panel Two" 
            currentView={currentView} 
          />
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <GrafanaProvider>
    <GrafanaPanels />
  </GrafanaProvider>
);

// ✅ Export mount for Module Federation host (React 19)
export function mount(el) {
  const root = createRoot(el);
  root.render(<App />);
  document.body.classList.add(mainStyles.body);
  return root; // host can call root.unmount() on cleanup
}

// ✅ Keep standalone bootstrap for local dev
if (document.getElementById("app")) {
  mount(document.getElementById("app"));
}

export default App;