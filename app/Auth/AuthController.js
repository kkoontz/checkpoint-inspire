import { AppState } from '../AppState.js'
import { getRedirectUri } from '../env.js'
import { preferencesService } from '../services/PreferencesService.js'
import { AuthService } from './AuthService.js'
import { logger } from '../utils/Logger.js'

function loginRedirectOptions(extra = {}) {
  return {
    redirectUri: getRedirectUri(),
    appState: {
      targetUrl: (window.location.pathname + window.location.hash) || '/'
    },
    ...extra
  }
}

export class AuthController {
  constructor() {
    AppState.identity = null
    AuthService.on(AuthService.AUTH_EVENTS.LOADED, () => this.draw())
    AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => this.draw())
    AuthService.on(AuthService.AUTH_EVENTS.NOT_AUTHENTICATED, () => this.draw())
    AppState.on('identity', () => this.draw())
    AppState.on('account', () => this.draw())
    this.draw()
  }

  async login() {
    try {
      await AuthService.loginWithRedirect(loginRedirectOptions())
    } catch (e) {
      logger.error(e)
    }
  }

  async register() {
    try {
      await AuthService.loginWithRedirect(
        loginRedirectOptions({
          authorizationParams: { screen_hint: 'signup' }
        })
      )
    } catch (e) {
      logger.error(e)
    }
  }

  logout() {
    try {
      AuthService.logout({ returnTo: getRedirectUri() })
    } catch (e) {
      logger.error(e)
    }
  }

  draw() {
    const mount = document.getElementById('user-area')
    if (!mount) return

    const user = AppState.identity
    if (AuthService.loading) {
      mount.innerHTML = '<div class="user-skeleton" aria-hidden="true"></div>'
      return
    }

    if (!user) {
      mount.innerHTML = /* html */`
        <div class="auth-actions">
          <button type="button" class="btn-glass" onclick="app.authController.login()">Log in</button>
          <button type="button" class="btn-glass btn-glass--primary" onclick="app.authController.register()">Register</button>
        </div>
      `
      return
    }

    const prefs = preferencesService.preferences
    const displayName =
      prefs.greetingName ||
      AppState.account?.name ||
      user.nickname ||
      user.name ||
      'friend'

    mount.innerHTML = /* html */`
      <div class="user-profile">
        <a href="#/settings" class="user-profile-link" title="Settings">
          <img class="user-avatar" src="${user.picture}" alt="" width="44" height="44">
          <span class="user-greeting">Bonjour, ${displayName}</span>
        </a>
        <button type="button" class="btn-icon" onclick="app.authController.logout()" title="Log out" aria-label="Log out">
          <i class="mdi mdi-logout"></i>
        </button>
      </div>
    `
  }
}
