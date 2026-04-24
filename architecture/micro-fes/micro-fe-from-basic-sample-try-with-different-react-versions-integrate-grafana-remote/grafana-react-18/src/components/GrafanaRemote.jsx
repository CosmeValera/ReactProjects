import React, { useEffect, useState, useRef } from "react";
import styles from './GrafanaRemote.module.css';
import { createMount } from "./mountFactory.js";

const GrafanaRemote = ({ src, width, height, name, currentView, panelId }) => {
  const [updatedSrc, setUpdatedSrc] = useState(src);
  const lastForceRefresh = useRef(null);
  const lastRefresh = useRef(null);
  
  const { grafanaCommunicationValues } = currentView;
  const { timeRange, refresh, forceRefresh, grafanaVariables, selectedGrafanaValues, affectedPanelIds } = grafanaCommunicationValues;

  useEffect(() => {
    // Check if forceRefresh/refresh is new (different from last time)
    const isNewForceRefresh = forceRefresh && forceRefresh !== lastForceRefresh.current;
    const isNewRefresh = refresh !== lastRefresh.current;

    // Update if:
    // 1. The user clicked manual refresh or set a timerange (NEW forceRefresh value)
    // 2. OR: The refresh interval changed (should update all panels)
    // 3. OR: The user selected a variable, and this panel is in the affected panels list
    const shouldUpdate = isNewForceRefresh || isNewRefresh || (affectedPanelIds && affectedPanelIds.includes(panelId));

    if (shouldUpdate) {
      updateIframeSrc();

      // Update the last forceRefresh/refresh value
      if (isNewForceRefresh) {
        lastForceRefresh.current = forceRefresh;
      }
      if (isNewRefresh) {
        lastRefresh.current = refresh;
      }
    }
  }, [timeRange, refresh, forceRefresh, selectedGrafanaValues, affectedPanelIds, panelId]);

  const updateTimeRangeInSrc = (currentSrc) => {
    if (timeRange) {
      const { from, to } = timeRange.raw;
      return currentSrc
        .replace(/from=[^&]*/, `from=${from}`)
        .replace(/to=[^&]*/, `to=${to}`);
    }
    return currentSrc;
  };

  const updateRefreshInSrc = (currentSrc) => {
    let newSrc = currentSrc;

    // Refresh Interval
    if (refresh && refresh !== 'Off') {
      newSrc = newSrc.replace(/refresh=[^&]*/, `refresh=${refresh}`);
      if (!newSrc.includes('refresh=')) {
        newSrc += `&refresh=${refresh}`;
      }
    } else {
      newSrc = newSrc.replace(/&?refresh=[^&]*/, '');
    }

    // Force refresh (reload)
    if (forceRefresh) {
      // Remove existing forceRefresh parameter first
      newSrc = newSrc.replace(/&?forceRefresh=[^&]*/, '');
      newSrc += `&forceRefresh=${forceRefresh}`;
    }

    return newSrc;
  };

  const updateVariablesInSrc = (currentSrc) => {
    // Create a new URL object to handle parameters more cleanly
    const url = new URL(currentSrc);
    
    // First, preserve ALL existing variables from the current URL
    const existingVariables = {};
    url.searchParams.forEach((value, key) => {
      if (key.startsWith('var-')) {
        existingVariables[key] = value;
      }
    });
    
    // If we have variable data available, update with new values
    if (selectedGrafanaValues && grafanaVariables && affectedPanelIds) {
      // Get only the variables that affect this panel
      const relevantVariables = grafanaVariables.filter(variable =>
        variable.affectedPanelIds.includes(panelId)
      );
      
      // Update or add each relevant variable
      relevantVariables.forEach(variable => {
        const value = selectedGrafanaValues[variable.name];
        if (value) {
          url.searchParams.set(`var-${variable.name}`, value);
        }
      });
    } else {
      // If no variable data is available, restore all existing variables
      Object.entries(existingVariables).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }
    
    return url.toString();
  };

  const updateIframeSrc = () => {
    let newSrc = src;
    newSrc = updateTimeRangeInSrc(newSrc);
    newSrc = updateRefreshInSrc(newSrc);
    newSrc = updateVariablesInSrc(newSrc);
    setUpdatedSrc(newSrc);
  };

  return (
    <iframe
      className={styles.grafanaPanel}
      src={updatedSrc}
      width={width}
      height={height}
      title={name}
      frameBorder="0"
    ></iframe>
  );
};

export const mount = createMount(GrafanaRemote);
export default GrafanaRemote;