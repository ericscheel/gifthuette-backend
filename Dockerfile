# Multi-stage build für optimale Performance
FROM node:20-alpine AS builder

WORKDIR /app

# Package files kopieren
COPY package*.json ./
COPY prisma ./prisma/

# ALLE Dependencies installieren (auch devDependencies für Build)
RUN npm ci && npm cache clean --force

# Source code kopieren
COPY . .

# Prisma generieren
RUN npx prisma generate

# Application bauen
RUN npm run build

# Production image
FROM node:20-alpine AS runner

# Security updates und curl für healthcheck
RUN apk update && apk upgrade && apk add --no-cache curl

# Non-root user erstellen
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

WORKDIR /app

# Package files kopieren
COPY package*.json ./

# NUR Production dependencies installieren (neue Syntax)
RUN npm ci --omit=dev && npm cache clean --force

# Prisma Schema kopieren und generieren
COPY --chown=nestjs:nodejs prisma ./prisma/
RUN npx prisma generate

# Built application kopieren
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Logs-Verzeichnis erstellen
RUN mkdir -p logs && chown nestjs:nodejs logs

# User wechseln
USER nestjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Port exposen
EXPOSE 3000

# Start command
CMD ["node", "dist/main.js"]