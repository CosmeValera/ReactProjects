import { render } from 'solid-js/web'
import './index.css'
import App from './App.jsx'

export function mount(el) {
  const dispose = render(() => <App />, el)
  return {
    unmount() {
      dispose()
    }
  }
}

export default mount
