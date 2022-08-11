import { dev } from './env.js'
import { EventEmitter } from './Utils/EventEmitter.js'
import { isValidProp } from './Utils/isValidProp.js'

class AppState extends EventEmitter {
  user = {}
  account = {}
  /** @type {import('./Models/Value').Value[]} */
  values = []
  socketData = []

  /** @type {import('./Models/Ship').Ship[]} */
  ships = []

  /** @type {import('./Models/Package').Package[]} */
  sentPackages = []

  /** @type {import('./Models/Package').Package[]} */
  receivedPackages = []

  /** @type {import('./Models/Package').Package[]} */
  shipPackages = []

  /** @type {import('./Models/Ship').Ship} */
  // @ts-ignore
  activeShip = null

}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

if (dev) {
  // @ts-ignore
  window.ProxyState = ProxyState
}
