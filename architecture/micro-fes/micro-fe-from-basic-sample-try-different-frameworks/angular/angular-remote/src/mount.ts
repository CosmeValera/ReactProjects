import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

export function mount(el: HTMLElement) {
  el.innerHTML = '<app-root></app-root>';

  let appRef: any;

  bootstrapApplication(App).then((ref) => {
    appRef = ref;
  });

  return {
    unmount: () => appRef?.destroy(),
    update: (_newProps: unknown) => {},
  };
}

export default mount;