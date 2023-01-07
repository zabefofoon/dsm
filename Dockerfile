FROM node:18-alpine AS base
RUN npm i -g pnpm

FROM base AS install
WORKDIR /app
COPY . .
RUN pnpm install

FROM install AS build-client
WORKDIR /app
COPY . .
RUN pnpm build:client

FROM install AS  build-server
WORKDIR /app
COPY . .
RUN pnpm build:server

FROM build-client AS  deploy-client
WORKDIR /app
COPY --from=build-client /app/client/.output ./client/.output

FROM build-server AS  deploy-server
WORKDIR /app
COPY --from=build-server /app/server/dist ./server/dist

EXPOSE 3001 3000