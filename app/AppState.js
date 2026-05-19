import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {
  /** @type {import('./Auth/Identity.js').Identity | null} */
  identity = null
  /** @type {import('./models/Account.js').Account | null} */
  account = null
  /** @type {import('./models/Image.js').Image | null} */
  image = null
  /** @type {import('./models/Weather.js').Weather | null} */
  weather = null
  /** @type {import('./models/Quote.js').Quote | null} */
  quote = null
  /** @type {import('./models/Todo.js').Todo[]} */
  todos = []
  /** @type {'C' | 'F'} */
  temperatureUnit = 'C'
  /** @type {'12' | '24'} */
  clockFormat = '12'
}

export const AppState = createObservableProxy(new ObservableAppState())
