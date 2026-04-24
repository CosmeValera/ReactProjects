import React, { useEffect, useRef } from "react";
import { mount } from "grafana_remote/GrafanaApp";

export default function GrafanaWrapper() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    
    const root = mount(ref.current);
    
    // Cleanup on unmount
    return () => {
      root.unmount();
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ width: "100%", height: "100%" }} 
    />
  );
}