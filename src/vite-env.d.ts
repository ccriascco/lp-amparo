/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL do web app do Amparo (Netlify). Todo CTA "Acessar o Amparo" aponta para ela. */
  readonly VITE_APP_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
