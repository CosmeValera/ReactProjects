import { beforeAll, afterEach, afterAll } from 'vitest'
import { server } from './src/mocks/server'
 
beforeAll(() => {
  server.listen( {onUnhandledRequest: 'warn'})
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => {
  server.close()
})