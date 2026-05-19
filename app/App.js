import { AuthController } from './Auth/AuthController.js'
import { AppState } from './AppState.js'
import { ClockController } from './controllers/ClockController.js'
import { ImageController } from './controllers/ImageController.js'
import { QuoteController } from './controllers/QuoteController.js'
import { SettingsController } from './controllers/SettingsController.js'
import { TodoController } from './controllers/TodoController.js'
import { WeatherController } from './controllers/WeatherController.js'
import { preferencesService } from './services/PreferencesService.js'
import { initRouter } from './utils/router-config.js'

class App {
  authController = new AuthController()
  imageController = new ImageController()
  clockController = new ClockController()
  weatherController = new WeatherController()
  quoteController = new QuoteController()
  todoController = new TodoController()
  settingsController = new SettingsController()

  constructor() {
    AppState.temperatureUnit = preferencesService.temperatureUnit
    AppState.clockFormat = preferencesService.clockFormat
    initRouter(this)
  }
}

window.app = new App()
