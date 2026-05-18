# ---- Base ----
FROM node:22-alpine AS base

WORKDIR /app

# ---- Dependencies ----
FROM base AS deps

COPY package.json package-lock.json ./

RUN npm install

# ---- Builder ----
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

# ---- Runner ----
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# Prisma
COPY --from=builder /app/prisma ./prisma

# Next standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]