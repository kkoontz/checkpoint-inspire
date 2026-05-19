import { SettingsController } from '../controllers/SettingsController.js'
import { Router } from './Router.js'

export function initRouter(app) {
  const router = new Router(app, {
    targetElm: '#router-view',
    routes: [
      {
        path: '',
        view: '',
        controllers: []
      },
      {
        path: '#/settings',
        view: 'app/views/SettingsView.html',
        controllers: [SettingsController],
        target: '#router-view'
      }
    ]
  })

  window.addEventListener('hashchange', () => updateRouteOverlay())
  const origHandle = router.handleRouteChange.bind(router)
  router.handleRouteChange = async function () {
    await origHandle()
    updateRouteOverlay()
    if (location.hash === '#/settings' && window.app?.settingsController) {
      window.app.settingsController.draw()
    }
  }

  updateRouteOverlay()
  return router
}

function updateRouteOverlay() {
  const overlay = document.getElementById('router-view')
  if (!overlay) return
  const isSettings = location.hash === '#/settings'
  overlay.hidden = !isSettings
}
