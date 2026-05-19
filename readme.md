# Inspire

Personal dashboard checkpoint for CodeWorks — background imagery, weather, quotes, clock, and authenticated todos via the Sandbox API and Auth0.

## Setup

```bash
npm install
npm start
```

Open [http://localhost:8080](http://localhost:8080) (Auth0 requires **`localhost`**, not `127.0.0.1` or `file://`). If you use `npm start`, bookmark localhost — the app will redirect away from `127.0.0.1` automatically.

## Stack

- CodeWorks MVC template (vanilla JS modules)
- Auth0 SPA + Sandbox API (`https://sandbox.codeworksacademy.com`)
- Observer pattern via `AppState` + `EventEmitter`
