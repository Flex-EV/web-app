export const getEnvVars = () => ({
  GOOGLE_MAPS_API_KEY: import.meta.env.DEV
    ? import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    : 'RUNTIME_GOOGLE_MAPS_API_KEY',
  GOOGLE_MAP_ID: import.meta.env.DEV
    ? import.meta.env.VITE_GOOGLE_MAP_ID
    : 'RUNTIME_GOOGLE_MAP_ID',
});
