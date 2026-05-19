import { AppState } from '../AppState.js'
import { Weather } from '../models/Weather.js'
import { api } from '../utils/Axios.js'
import { Pop } from '../utils/Pop.js'
import { preferencesService } from './PreferencesService.js'

class WeatherService {
  async loadWeather() {
    try {
      const res = await api.get('api/weather', {
        params: { city: preferencesService.city || 'Boise' }
      })
      AppState.weather = new Weather(res.data)
    } catch (error) {
      console.error('[WeatherService]', error)
      Pop.error(error, 'Could not load weather')
    }
  }
}

export const weatherService = new WeatherService()
