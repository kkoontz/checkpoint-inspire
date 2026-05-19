import { AppState } from '../AppState.js'
import { imagesService } from '../services/ImagesService.js'
import { preferencesService } from '../services/PreferencesService.js'
import { weatherService } from '../services/WeatherService.js'
import { getFormData } from '../utils/FormHandler.js'

export class SettingsController {
  constructor() {
    document.getElementById('settings-back')?.addEventListener('click', (e) => {
      e.preventDefault()
      location.hash = ''
    })
    document.getElementById('settings-form')?.addEventListener('submit', (e) => this.#onSave(e))
    document.querySelectorAll('[data-clock-format]').forEach(btn => {
      btn.addEventListener('click', () => this.#setClock(btn.dataset.clockFormat))
    })
    document.querySelectorAll('[data-temp-unit]').forEach(btn => {
      btn.addEventListener('click', () => this.#setTemp(btn.dataset.tempUnit))
    })
    AppState.on('identity', () => this.draw())
    this.draw()
  }

  draw() {
    const prefs = preferencesService.preferences
    const form = document.getElementById('settings-form')
    if (!form) return

    form.city.value = prefs.city
    form.collection.value = prefs.collection
    form.greetingName.value = prefs.greetingName

    document.querySelectorAll('[data-clock-format]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.clockFormat === prefs.clockFormat)
    })
    document.querySelectorAll('[data-temp-unit]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.tempUnit === prefs.temperatureUnit)
    })

    const identity = AppState.identity
    const greeting = document.getElementById('settings-greeting')
    const avatar = document.getElementById('settings-avatar')
    if (greeting) {
      const name = prefs.greetingName || identity?.name || identity?.nickname || 'Guest'
      greeting.textContent = `Bonjour, ${name}`
    }
    if (avatar) {
      if (identity?.picture) {
        avatar.src = identity.picture
        avatar.alt = identity.name
        avatar.hidden = false
      } else {
        avatar.hidden = true
      }
    }
  }

  #setClock(format) {
    preferencesService.save({ clockFormat: format })
    AppState.clockFormat = format
    document.querySelectorAll('[data-clock-format]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.clockFormat === format)
    })
  }

  #setTemp(unit) {
    preferencesService.save({ temperatureUnit: unit })
    AppState.temperatureUnit = unit
    document.querySelectorAll('[data-temp-unit]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.tempUnit === unit)
    })
  }

  async #onSave(event) {
    event.preventDefault()
    const data = getFormData(event.target)
    preferencesService.save({
      city: data.city?.trim() || 'Boise',
      collection: data.collection?.trim() || '',
      greetingName: data.greetingName?.trim() || ''
    })
    AppState.temperatureUnit = preferencesService.temperatureUnit
    AppState.clockFormat = preferencesService.clockFormat
    await Promise.all([
      weatherService.loadWeather(),
      imagesService.loadImage()
    ])
  }
}
