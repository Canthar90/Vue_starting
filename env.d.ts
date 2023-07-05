/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
}

interface ImportNeta {
  readonly env: ImportMetaEnv
}