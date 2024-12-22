#!/bin/sh

# Inject the runtime configuration
echo "window.__RUNTIME_CONFIG__ = {
  API_URL: '${API_URL}',
  GOOGLE_MAPS_KEY: '${GOOGLE_MAPS_KEY}'
};" > /usr/share/nginx/html/config.js

# Start nginx
nginx -g 'daemon off;'