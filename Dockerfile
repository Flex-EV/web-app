# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the code
COPY . .

# The build step will have access to build-time args
ARG VITE_AGENT_API_URL
ENV VITE_AGENT_API_URL=$VITE_AGENT_API_URL

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]