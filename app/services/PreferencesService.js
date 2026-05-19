import { loadState, saveState } from '../utils/Store.js'

const DEFAULTS = {
  city: 'Boise',
  collection: '',
  temperatureUnit: 'C',
  clockFormat: '12',
  greetingName: ''
}

class PreferencesService {
  #prefs = { ...DEFAULTS }

  constructor() {
    const saved = loadState('preferences')
    if (saved) {
      try {
        this.#prefs = { ...DEFAULTS, ...JSON.parse(saved) }
      } catch {
        this.#prefs = { ...DEFAULTS }
      }
    }
  }

  get preferences() {
    return { ...this.#prefs }
  }

  get city() { return this.#prefs.city }
  get collection() { return this.#prefs.collection }
  get temperatureUnit() { return this.#prefs.temperatureUnit }
  get clockFormat() { return this.#prefs.clockFormat }
  get greetingName() { return this.#prefs.greetingName }

  save(updates) {
    this.#prefs = { ...this.#prefs, ...updates }
    saveState('preferences', JSON.stringify(this.#prefs))
    return this.#prefs
  }
}

export const preferencesService = new PreferencesService()
