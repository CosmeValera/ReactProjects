import React, { useEffect, useRef } from "react";

export default function RemoteWrapper({ mount, ...props }) {
  const ref = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    instanceRef.current = mount(ref.current, props);
    return () => instanceRef.current?.unmount();
  }, []); // mount only once

  // When props change, call update() instead of remounting
  useEffect(() => {
    instanceRef.current?.update(props);
  }, [JSON.stringify(props)]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}