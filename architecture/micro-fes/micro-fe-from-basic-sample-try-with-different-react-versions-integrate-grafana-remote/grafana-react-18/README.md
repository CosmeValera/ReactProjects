# Grafana MFE

This application provides various Grafana-related components as micro-frontends that can be used in a larger application, or run independently in standalone mode.

## Components

### GrafanaRemote
A component that embeds a Grafana dashboard panel in an iframe and can react to time range and refresh changes.

Props:
- `src`: URL of the Grafana panel
- `width`: Width of the iframe
- `height`: Height of the iframe
- `name`: Title for the iframe
- `currentView`: Object containing time range and refresh settings

### GrafanaTimeRange
A component that provides time range selection UI for Grafana dashboards.

### GrafanaRefresh
A component that provides refresh controls for Grafana dashboards.

## Running Modes

### Standalone Mode
When running the application directly using `Main.jsx`, it displays two instances of GrafanaRemote with fixed URLs, showing Grafana panels.

To run in standalone mode:
```
npm run start
```

### Micro-Frontend Mode
When used as a micro-frontend in a host application, each component can be imported and used individually through the exposed modules.

Example:
```jsx
import { GrafanaRemote } from 'grafana_mfe/GrafanaRemote';

function App() {
  return (
    <GrafanaRemote 
      src="http://your-grafana-url" 
      width="100%" 
      height="400px" 
      name="My Grafana Panel" 
      currentView={yourCurrentViewData} 
    />
  );
}
```

## Implementation Details

The application uses a modular approach:

- `Main.jsx` provides the standalone application that renders two GrafanaRemote instances
- The individual components (GrafanaRemote, GrafanaTimeRange, GrafanaRefresh) are exposed as micro-frontend modules for use in other applications

This approach allows maintaining a single codebase for both use cases. 