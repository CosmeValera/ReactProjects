import { createApp, h } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export function mount(el) {
  const app = createApp(HelloWorld)
  app.mount(el)

  return {
    unmount() {
      app.unmount()
    }
  }
}

export default HelloWorld