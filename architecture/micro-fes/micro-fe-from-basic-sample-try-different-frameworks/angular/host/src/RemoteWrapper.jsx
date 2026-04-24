import React, { useEffect, useRef } from "react";

export default function RemoteWrapper({ mount, ...props }) {
  const ref = useRef(null);
  const instanceRef = useRef(null);

  // Mount once into the DOM node
  useEffect(() => {
    if (!ref.current) return;
    instanceRef.current = mount(ref.current, props);
    return () => instanceRef.current?.unmount();
  }, []);

  // Forward prop updates to the remote without remounting
  useEffect(() => {
    instanceRef.current?.update(props);
  }, [JSON.stringify(props)]);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}