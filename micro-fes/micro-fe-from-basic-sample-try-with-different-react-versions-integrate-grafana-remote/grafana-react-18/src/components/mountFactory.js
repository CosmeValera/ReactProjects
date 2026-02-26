import React from "react";
import { createRoot } from "react-dom/client";

export function createMount(Component) {
  return function mount(el, props = {}) {
    const root = createRoot(el);
    root.render(<Component {...props} />);

    // Allow the host to update props after initial mount
    return {
      unmount: () => root.unmount(),
      update: (newProps) => root.render(<Component {...newProps} />),
    };
  };
}