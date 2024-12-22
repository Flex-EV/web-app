FROM node:22-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine
# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built files
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the entrypoint script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

# Use the entrypoint script
CMD ["/docker-entrypoint.sh"]