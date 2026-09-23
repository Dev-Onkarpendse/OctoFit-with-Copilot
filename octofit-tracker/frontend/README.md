# OctoFit Tracker frontend

The presentation tier uses React 19, Vite, Bootstrap, and `react-router-dom`.

## API configuration

In Codespaces, define `VITE_CODESPACE_NAME` in `.env.local` using the value of
the `CODESPACE_NAME` environment variable:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes only variables prefixed with `VITE_`. The app uses this value to
call `https://<name>-8000.app.github.dev/api/<resource>/`. When it is unset,
the app safely falls back to `http://localhost:8000`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
