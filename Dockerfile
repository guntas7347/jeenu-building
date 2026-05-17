ARG NODE_VERSION=22-alpine

# Stage 1: Dependencies
FROM node:${NODE_VERSION} AS dependencies
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# Stage 2: Builder
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .


ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV NEXTAUTH_SECRET="dummy"
ENV GOOGLE_CLIENT_ID="dummy"
ENV GOOGLE_CLIENT_SECRET="dummy"
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dummy"
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="dummy"
ENV NEXT_PUBLIC_LOCATIONIQ_KEY="dummy"

RUN npx prisma generate

RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

# Stage 3: Runner
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Only copy what is strictly necessary for the standalone server
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs
EXPOSE 3000

# Optional: Ensure your migrations run before starting (if needed)
# CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
CMD ["node", "server.js"]