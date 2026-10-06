# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Local configuration

The API client reads `import.meta.env.VITE_CODESPACE_NAME`.

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, the frontend uses:

```text
https://your-codespace-name-8000.app.github.dev
```

When it is unset, the frontend safely falls back to:

```text
http://localhost:8000
```
