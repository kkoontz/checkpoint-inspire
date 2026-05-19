import { AppState } from '../AppState.js'
import { weatherService } from '../services/WeatherService.js'
import { preferencesService } from '../services/PreferencesService.js'

export class WeatherController {
  #weatherEl = null

  constructor() {
    this.#weatherEl = document.getElementById('weather-widget')
    AppState.temperatureUnit = preferencesService.temperatureUnit
    AppState.on('weather', () => this.draw())
    AppState.on('temperatureUnit', () => this.draw())
    this.#weatherEl?.addEventListener('click', () => this.#toggleUnit())
    weatherService.loadWeather()
  }

  #toggleUnit() {
    AppState.temperatureUnit = AppState.temperatureUnit === 'C' ? 'F' : 'C'
    preferencesService.save({ temperatureUnit: AppState.temperatureUnit })
  }

  draw() {
    const weather = AppState.weather
    if (!this.#weatherEl || !weather) return

    const unit = AppState.temperatureUnit
    const temp = unit === 'F' ? weather.tempF : weather.tempC
    const iconUrl = weather.icon?.startsWith('http')
      ? weather.icon
      : `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

    this.#weatherEl.innerHTML = /* html */`
      <button type="button" class="weather-hit" title="Toggle °F / °C" aria-label="Toggle temperature unit">
        <img class="weather-icon" src="${iconUrl}" alt="" width="48" height="48">
        <span class="weather-temp">${temp}°${unit}</span>
        <span class="weather-desc">${weather.description}</span>
      </button>
    `
  }
}
