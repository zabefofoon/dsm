FROM node:18-alpine AS base
RUN npm i -g pnpm

FROM base AS install
WORKDIR /app
COPY . .
RUN pnpm install

FROM base AS build
WORKDIR /app
COPY --from=install /app .
RUN pnpm build

EXPOSE 3000