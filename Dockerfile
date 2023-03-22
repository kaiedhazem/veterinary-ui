FROM node:18-slim AS node
WORKDIR /front

COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

FROM nginx:alpine
COPY --from=node /front/dist /usr/share/nginx/html