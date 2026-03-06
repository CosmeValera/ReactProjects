import React, { useEffect, useRef } from "react"
import { mount } from "solidjs_remote/MainRemote"

export default function RemoteWrapper() {
  const ref = useRef(null)
  const appRef = useRef(null)

  useEffect(() => {
    if (ref.current && !appRef.current) {
      appRef.current = mount(ref.current)
    }

    // Cleanup on unmount
    return () => {
      if (appRef.current) {
        appRef.current.unmount()
        appRef.current = null
      }
    }
  }, [])
  return <div ref={ref} />
}
