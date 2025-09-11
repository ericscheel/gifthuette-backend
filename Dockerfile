FROM node:20-alpine

WORKDIR /app

# System-Updates und curl
RUN apk update && apk upgrade && apk add --no-cache curl

# Package files kopieren
COPY package*.json ./

# Dependencies installieren (ohne ci)
RUN npm install && npm cache clean --force

# Prisma Schema kopieren
COPY prisma ./prisma/
RUN npx prisma generate

# Source code kopieren
COPY . .

# Application bauen
RUN npm run build

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000

CMD ["node", "dist/main.js"]