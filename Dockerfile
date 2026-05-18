# ============================================
# Stage 1: Dependencies & Prisma Generation
# ============================================
FROM node:24-alpine AS deps

# Prisma requires OpenSSL and libc6-compat for its query engine on Alpine Linux
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package managers and Prisma schema first to maximize Docker caching
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
COPY prisma ./prisma/

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Generate Prisma Client (Crucial: Must happen before the Next.js build)
RUN npx prisma generate

# ============================================
# Stage 2: Builder
# ============================================
FROM node:24-alpine AS builder

WORKDIR /app

# Copy dependencies and the generated Prisma client
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ============================================
# Stage 3: Runner
# ============================================
FROM node:24-alpine AS runner

# Prisma requires OpenSSL at runtime to execute database queries
RUN apk add --no-cache openssl

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a secure non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets
COPY --from=builder /app/public ./public

# Set proper permissions for Next.js cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Next.js Standalone mode automatically traces and copies the Prisma query engine 
# into the standalone node_modules, keeping the final image tiny.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

EXPOSE 3000

# Start the standalone server
CMD ["node", "server.js"]