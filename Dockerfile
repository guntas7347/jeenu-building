# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

# -----------------------------
# Dependencies
# -----------------------------
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci

# -----------------------------
# Builder
# -----------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# -----------------------------
# Production Runner
# -----------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs

# Copy production files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["npm", "start"]