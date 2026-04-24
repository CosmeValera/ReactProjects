import React, { useState, useEffect } from 'react';
import { RefreshPicker } from '@grafana/ui'; // Import the RefreshPicker
import styles from './GrafanaRefresh.module.css';
import { createMount } from "./mountFactory.js";

const GrafanaRefresh = ({ updateCurrentView, currentView }) => {
  const [refreshInterval, setRefreshInterval] = useState(currentView?.grafanaCommunicationValues?.refresh || 'Off');

  useEffect(() => {
    // Sync local state with global value
    if (currentView?.grafanaCommunicationValues?.refresh !== refreshInterval) {
      setRefreshInterval(currentView?.grafanaCommunicationValues?.refresh || 'Off');
    }
  }, [currentView?.grafanaCommunicationValues?.refresh]);

  const onIntervalChanged = (interval) => {
    setRefreshInterval(interval);
    
    // Preserve existing values while updating refresh
    const currentValues = currentView?.grafanaCommunicationValues || {};
    updateCurrentView({ 
      grafanaCommunicationValues: { 
        ...currentValues,  // Preserve existing values
        refresh: interval 
      } 
    });
  };
  
  const onRefreshFired = () => {
    // Force a refresh by updating the timestamp while preserving all existing values
    const currentValues = currentView?.grafanaCommunicationValues || {};
    updateCurrentView({ 
      grafanaCommunicationValues: { 
        ...currentValues,  // Preserve existing values (including timeRange)
        refresh: refreshInterval, 
        forceRefresh: Date.now() 
      } 
    });
  };

  return (
    <div className={styles.grafanaRefresh}>
      <RefreshPicker
        tooltip="Refresh"
        value={refreshInterval}
        onIntervalChanged={onIntervalChanged}
        onRefresh={onRefreshFired}
        isOnCanvas={true}
      />
    </div>
  );
};

export const mount = createMount(GrafanaRefresh);
export default GrafanaRefresh;