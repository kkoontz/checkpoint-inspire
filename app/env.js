export const dev =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1')

export const baseURL = 'https://sandbox.codeworksacademy.com/'
export const domain = 'codeworksclassroom.auth0.com'
export const audience = 'https://codeworksclassroom.com'
export const clientId = 'pOXw2OGv1LsYi7LEBmDF04RLkXQvldml'

/** CodeWorks Auth0 allowlist uses http://localhost:PORT — not 127.0.0.1 or full page URLs. */
export function getRedirectUri() {
  if (typeof window === 'undefined') {
    return 'http://localhost:8080'
  }

  const port = window.location.port || '8080'

  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    return `http://localhost:${port}`
  }

  return window.location.origin
}
