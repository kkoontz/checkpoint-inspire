# Inspire

Personal dashboard checkpoint for CodeWorks — background imagery, weather, quotes, clock, and authenticated todos via the Sandbox API and Auth0.

## Setup

```bash
npm install
npm start
```

Open [http://localhost:8080](http://localhost:8080) (Auth0 requires **`localhost`**, not `127.0.0.1` or `file://`). If you use `npm start`, bookmark localhost — the app will redirect away from `127.0.0.1` automatically.

### Auth0 login

You do **not** need your own Auth0 developer account — the classroom credentials in `app/env.js` are already configured.

1. **First time:** click **Register**, complete signup on the Auth0 page, then **Accept** on the consent screen.
2. **Returning:** click **Log in** with the same email/password.

After **Accept**, you should land on Inspire still on `localhost:8080` with **Bonjour, …** and working todos — not back on the Log in / Register buttons. If login loops, hard-refresh and try again in a normal browser window (not strict private mode).

## Stack

- CodeWorks MVC template (vanilla JS modules)
- Auth0 SPA + Sandbox API (`https://sandbox.codeworksacademy.com`)
- Observer pattern via `AppState` + `EventEmitter`
