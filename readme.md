# Inspire

Personal dashboard checkpoint for CodeWorks — background imagery, weather, quotes, clock, and authenticated todos via the Sandbox API and Auth0.

## Setup

```bash
npm install
npm start
```

Open [http://localhost:8080](http://localhost:8080) (Auth0 requires localhost, not `file://`).

## Stack

- CodeWorks MVC template (vanilla JS modules)
- Auth0 SPA + Sandbox API (`https://sandbox.codeworksacademy.com`)
- Observer pattern via `AppState` + `EventEmitter`
