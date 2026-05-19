export class Weather {
  constructor(data = {}) {
    const kelvin = data.main?.temp ?? 273.15
    this.tempC = Math.round(kelvin - 273.15)
    this.tempF = Math.round((kelvin - 273.15) * 9 / 5 + 32)
    const weatherEntry = data.weather?.[0] ?? data.weather?.['0'] ?? data.weather
    this.description = weatherEntry?.description || data.weather?.description || '—'
    this.icon = data.weather?.icon || weatherEntry?.icon || ''
    this.city = data.name || 'Boise'
  }
}
