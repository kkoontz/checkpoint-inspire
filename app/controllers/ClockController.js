import { AppState } from '../AppState.js'
import { preferencesService } from '../services/PreferencesService.js'

export class ClockController {
  #clockEl = null
  #timer = null

  constructor() {
    this.#clockEl = document.getElementById('clock')
    AppState.clockFormat = preferencesService.clockFormat
    AppState.on('clockFormat', () => this.draw())
    this.draw()
    this.#scheduleTick()
  }

  #scheduleTick() {
    const now = new Date()
    const msUntilNextMinute =
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds()
    clearTimeout(this.#timer)
    this.#timer = setTimeout(() => {
      this.draw()
      this.#timer = setInterval(() => this.draw(), 60_000)
    }, msUntilNextMinute)
  }

  draw() {
    if (!this.#clockEl) return
    const now = new Date()
    const use24 = AppState.clockFormat === '24'

    if (use24) {
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      this.#clockEl.textContent = `${h}:${m}`
    } else {
      let hours = now.getHours() % 12
      if (hours === 0) hours = 12
      const m = String(now.getMinutes()).padStart(2, '0')
      const ampm = now.getHours() >= 12 ? 'pm' : 'am'
      this.#clockEl.textContent = `${hours}:${m}${ampm}`
    }
  }
}
