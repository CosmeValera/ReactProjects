import React, { useEffect, useRef } from "react";
import { mount } from "remote/MainRemote";

export default function RemoteWrapper() {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      mount(ref.current);
    }
  }, []);

  return <div ref={ref} />;
}