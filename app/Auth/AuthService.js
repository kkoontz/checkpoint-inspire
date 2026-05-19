import { AppState } from '../AppState.js'
import { accountService } from '../services/AccountService.js'
import { todosService } from '../services/TodosService.js'
import { audience, clientId, domain, getRedirectUri } from '../env.js'
import { api } from '../utils/Axios.js'
import { logger } from '../utils/Logger.js'
import { Identity } from './Identity.js'

// @ts-ignore
// eslint-disable-next-line no-undef
const redirectUri = getRedirectUri()

export const AuthService = Auth0Provider.initialize({
  domain,
  clientId,
  audience,
  redirectUri,
  useRefreshTokens: true,
  cacheLocation: 'localstorage',
  onRedirectCallback: appState => {
    const target =
      appState?.targetUrl || window.location.pathname + window.location.hash || '/'
    window.history.replaceState({}, document.title, target)
  }
})

export function AuthGuard(next) {
  if (!AuthService || AuthService.loading) {
    return setTimeout(() => AuthGuard(next), 750)
  }
  return AuthService.isAuthenticated ? next() : AuthService.loginWithRedirect()
}

let authInterceptorAttached = false

async function applyAuthenticatedSession() {
  if (!AuthService.isAuthenticated) return

  await AuthService.getTokenSilently()
  api.defaults.headers.authorization = AuthService.bearer
  if (!authInterceptorAttached) {
    api.interceptors.request.use(refreshAuthToken)
    authInterceptorAttached = true
  }

  AuthService.user = AuthService.user || await AuthService.auth0Client.getUser()
  AuthService.user.id = AuthService.user[audience + '/id']
  console.log('🛡️', AuthService.user.nickname, ' Authenticated')
  AppState.identity = new Identity(AuthService.user)
  await accountService.loadAccount()
  await todosService.loadTodos()
}

AuthService.on(AuthService.AUTH_EVENTS.AUTHENTICATED, () => {
  applyAuthenticatedSession().catch(error => logger.error(error))
})

// Restore UI when Auth0 reloads session from localStorage on refresh
AuthService.on(AuthService.AUTH_EVENTS.LOADED, () => {
  if (AuthService.isAuthenticated && !AppState.identity) {
    applyAuthenticatedSession().catch(error => logger.error(error))
  }
})

AuthService.on(AuthService.AUTH_EVENTS.TOKEN_CHANGE, () => {
  if (AuthService.isAuthenticated) {
    api.defaults.headers.authorization = AuthService.bearer
  }
})

async function refreshAuthToken(config) {
  if (!AuthService.isAuthenticated) { return config }
  const expires = AuthService.identity.exp * 1000
  const expired = expires < Date.now()
  const needsRefresh = expires < Date.now() + (1000 * 60 * 60 * 12)
  if (expired) {
    await AuthService.loginWithPopup()
  } else if (needsRefresh) {
    await AuthService.getTokenSilently()
  }
  api.defaults.headers.authorization = AuthService.bearer
  return config
}
