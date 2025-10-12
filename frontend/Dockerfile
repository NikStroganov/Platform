# Этап сборки фронта
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Этап раздачи статики
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .    # Vite кладёт билд в /dist
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
