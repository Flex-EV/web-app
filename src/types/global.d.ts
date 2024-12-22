interface RuntimeConfig {
  GOOGLE_MAPS_API_KEY: string;
  GOOGLE_MAP_ID: string;
}

declare global {
  interface Window {
    __RUNTIME_CONFIG__: RuntimeConfig;
  }
}

export {};
