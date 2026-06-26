# syntax=docker/dockerfile:1

# Prod-образ для Next.js + Payload CMS.
# Используется только в prod-режиме (COMPOSE_PROFILES=prod).
# В dev-режиме приложение запускается локально (bun run dev), в Docker поднимается только БД.

# --- Установка зависимостей (bun, как в проекте — bun.lock) ---
FROM oven/bun:1-alpine AS deps
WORKDIR /app
# libc6-compat нужен для нативных модулей (sharp и пр.) на alpine/musl
RUN apk add --no-cache libc6-compat
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# --- Сборка Next.js ---
FROM oven/bun:1-alpine AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Плейсхолдеры на время сборки: payload.config читает эти переменные при импорте.
# Реальные значения подставляются на этапе runtime через docker compose / env.
ARG PAYLOAD_SECRET=build-time-placeholder
ARG DATABASE_URL=postgresql://build:build@localhost:5432/build
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URL=$DATABASE_URL
RUN bun run build

# --- Runtime: запускаем standalone-сервер через node ---
FROM node:22-alpine AS runner
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# standalone уже содержит трассированный node_modules (включая sharp, pg и т.д.)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
