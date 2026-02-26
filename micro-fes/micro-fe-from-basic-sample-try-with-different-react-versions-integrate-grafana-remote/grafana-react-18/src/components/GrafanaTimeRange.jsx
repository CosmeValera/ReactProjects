import React, { useState } from 'react';
import { TimeRangePicker } from '@grafana/ui';
import { dateTime } from '@grafana/data';
import moment from 'moment';
import styles from './GrafanaTimeRange.module.css';
import { createMount } from "./mountFactory.js";

const GrafanaTimeRange = ({ updateCurrentView, currentView }) => {
  // Initialize with the last 24 hours as default
  const [timeRangeInterval, setTimeRangeInterval] = useState(() => {
    return {
      from: dateTime().subtract(24, 'hours'),
      to: dateTime(),
      raw: {
        from: 'now-24h',
        to: 'now'
      }
    };
  });

  const onIntervalChanged = (interval) => {
    const updatedInterval = {
      from: interval.from,
      to: interval.to,
      raw: interval.raw,
    };

    // Update state and notify Zustand while preserving existing values
    setTimeRangeInterval(updatedInterval);
    const currentValues = currentView?.grafanaCommunicationValues || {};
    updateCurrentView({ 
      grafanaCommunicationValues: { 
        ...currentValues,  // Preserve existing values
        timeRange: updatedInterval, 
        forceRefresh: Date.now() 
      }
    });
    console.log("Interval changed:", updatedInterval);
  };

  const onZoomOut = () => {
    const currentDate = new Date().getTime();
    
    // Handle 'raw.from' and 'raw.to' whether they're numbers or moment instances
    const currentFrom = typeof timeRangeInterval.raw.from === 'number' 
      ? timeRangeInterval.raw.from 
      : timeRangeInterval.from._d.getTime();
      
    const currentTo = typeof timeRangeInterval.raw.to === 'number' 
      ? timeRangeInterval.raw.to 
      : timeRangeInterval.to._d.getTime();

    const difference = currentTo - currentFrom; 

    const range = difference !== 0 ? difference : 7200000; // 1 hour by default

    const zoomFactor = 0.5; // Defines how much to zoom out (50% of the current range)

    // Calculate new 'from' and 'to' for the zoomed-out range
    const newFrom = currentFrom - range * zoomFactor;
    const newTo = currentTo + range * zoomFactor >= currentDate 
      ? currentDate  // Prevent zooming out into the future
      : currentTo + range * zoomFactor;

    // Update time range with zoomed values
    const newTimeRange = {
      from: moment(newFrom),
      to: moment(newTo),
      raw: {
        from: newFrom,
        to: newTo,
      },
    };

    // Update state and notify Zustand while preserving existing values
    setTimeRangeInterval(newTimeRange);
    const currentValues = currentView?.grafanaCommunicationValues || {};
    updateCurrentView({ 
      grafanaCommunicationValues: { 
        ...currentValues,
        timeRange: newTimeRange, 
        forceRefresh: Date.now() 
      } 
    });
  };

  return (
    <div className={styles.grafanaHeader}>
      <TimeRangePicker
        value={timeRangeInterval}
        onChange={onIntervalChanged}
        timeZone="browser"
        isOnCanvas={true}
        onZoom={onZoomOut}
      />
    </div>
  );
};

export const mount = createMount(GrafanaTimeRange);
export default GrafanaTimeRange;