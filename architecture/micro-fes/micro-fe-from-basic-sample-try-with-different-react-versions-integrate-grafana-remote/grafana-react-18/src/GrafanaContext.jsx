import React, { createContext, useState, useContext, useCallback } from 'react';
import moment from 'moment';

// Create a context with default values
const GrafanaContext = createContext(null);

// Custom hook for consuming the context
export const useGrafanaContext = () => {
  const context = useContext(GrafanaContext);
  if (!context) {
    throw new Error('useGrafanaContext must be used within a GrafanaProvider');
  }
  return context;
};

// Initial state with default time range and refresh settings
const defaultTimeRange = {
  from: moment().subtract(6, 'hours'),
  to: moment(),
  raw: {
    from: moment().subtract(6, 'hours').valueOf(),
    to: moment().valueOf()
  }
};
const initialState = {
  timeRange: defaultTimeRange,
  refresh: 'Off',
  forceRefresh: false,
  grafanaCommunicationValues: {
    timeRange: defaultTimeRange,
    refresh: 'Off',
    forceRefresh: false,
    grafanaVariables: [],
    selectedGrafanaValues: {},
    affectedPanelIds: []
  }
};

// Provider component
export const GrafanaProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState(initialState);
  
  // Update function for components to modify the shared state
  const updateCurrentView = useCallback((updates) => {
    setCurrentView(prev => {
      const next = {
        ...prev,
        ...updates,
      };
      // Always keep grafanaCommunicationValues in sync
      next.grafanaCommunicationValues = {
        ...prev.grafanaCommunicationValues,
        ...updates.grafanaCommunicationValues,
        // If timeRange/refresh/forceRefresh are updated at the top level, sync them
        ...(updates.timeRange ? { timeRange: updates.timeRange } : {}),
        ...(updates.refresh ? { refresh: updates.refresh } : {}),
        ...(typeof updates.forceRefresh !== 'undefined' ? { forceRefresh: updates.forceRefresh } : {}),
      };
      return next;
    });
  }, []);

  // Store the current state in localStorage whenever it changes
  React.useEffect(() => {
    try {
      // We don't store the entire state as moment objects won't serialize well
      // Instead, store just the raw values that matter
      const storableState = {
        timeRange: {
          raw: currentView.timeRange.raw
        },
        refresh: currentView.refresh,
        forceRefresh: currentView.forceRefresh
      };
      localStorage.setItem('grafana-standalone-state', JSON.stringify(storableState));
    } catch (e) {
      console.error('Error storing Grafana state:', e);
    }
  }, [currentView]);

  // Load saved state from localStorage on initial mount
  React.useEffect(() => {
    try {
      const savedState = localStorage.getItem('grafana-standalone-state');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        // Reconstruct the full state with moment objects and always include grafanaCommunicationValues
        setCurrentView(prev => {
          const restoredTimeRange = {
            from: moment(parsed.timeRange.raw.from),
            to: moment(parsed.timeRange.raw.to),
            raw: parsed.timeRange.raw
          };
          return {
            ...prev,
            timeRange: restoredTimeRange,
            refresh: parsed.refresh || 'Off',
            forceRefresh: false, // Always reset forceRefresh on load
            grafanaCommunicationValues: {
              ...prev.grafanaCommunicationValues,
              timeRange: restoredTimeRange,
              refresh: parsed.refresh || 'Off',
              forceRefresh: false,
              // Keep other properties as default if not present
            }
          };
        });
      }
    } catch (e) {
      console.error('Error loading Grafana state:', e);
    }
  }, []);

  return (
    <GrafanaContext.Provider value={{ currentView, updateCurrentView }}>
      {children}
    </GrafanaContext.Provider>
  );
}; 