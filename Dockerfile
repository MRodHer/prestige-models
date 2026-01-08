FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the source code
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build (NEXT_PUBLIC vars are embedded at build time)
ENV NEXT_PUBLIC_SUPABASE_URL=https://vpdjovwmvivdpqkondyj.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwZGpvdndtdml2ZHBxa29uZHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MDE4NDcsImV4cCI6MjA4MzQ3Nzg0N30.2yZSEfPCr82nGXmTYH2G0wKqZPd183GfPPGseq2HQt0
ENV NEXT_PUBLIC_WHATSAPP_NUMBER=527223969159

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
