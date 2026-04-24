import React, { useState } from "react";
import RemoteWrapper from "./RemoteWrapper";
import { mount as mountRefresh }   from "grafana_remote/GrafanaRefresh";
import { mount as mountTimeRange } from "grafana_remote/GrafanaTimeRange";
import { mount as mountPanel }     from "grafana_remote/GrafanaRemote";
import mainStyles from "./Main.module.css";

const initialView = {
  grafanaCommunicationValues: {
    timeRange: null,
    refresh: "Off",
    forceRefresh: false,
    grafanaVariables: [],
    selectedGrafanaValues: {},
    affectedPanelIds: [],
  },
};

export default function AppHost() {
  const [currentView, setCurrentView] = useState(initialView);

  const updateCurrentView = (updates) => {
    setCurrentView((prev) => ({
      ...prev,
      ...updates,
      grafanaCommunicationValues: {
        ...prev.grafanaCommunicationValues,
        ...updates.grafanaCommunicationValues,
      },
    }));
  };

  return (
    <div>
      <h1>My Host App (React 19)</h1>

      <div className={mainStyles.panelsContainer}>
        <div className={mainStyles.controlsContainer}>
          <RemoteWrapper
            mount={mountRefresh}
            currentView={currentView}
            updateCurrentView={updateCurrentView}
          />

          <RemoteWrapper
            mount={mountTimeRange}
            currentView={currentView}
            updateCurrentView={updateCurrentView}
          />
       </div>
      <div className={mainStyles.panelContainer}>
        <h2 className={mainStyles.grafanaHeader}>Grafana Panel One</h2>
          <RemoteWrapper
            mount={mountPanel}
            src="http://localhost:6060/d-solo/fdmjva7j6u9z4c/demo-db?orgId=1&panelId=1"
            width="95%"
            height="400px"
            name="Panel One"
            currentView={currentView}
            panelId={1}
          />
      </div>
      <div className={mainStyles.panelContainer}>
        <h2 className={mainStyles.grafanaHeader}>Grafana Panel Two</h2>
          <RemoteWrapper
            mount={mountPanel}
            src="http://localhost:6060/d-solo/fdmjva7j6u9z4c/demo-db?orgId=1&panelId=2"
            width="95%"
            height="400px"
            name="Panel Two"
            currentView={currentView}
            panelId={2}
          />
        </div>
      </div>
    </div>
  );
}