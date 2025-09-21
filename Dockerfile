# 1. Instalar dependencias
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. Compilar TypeScript
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build   # aquí generas la carpeta dist

# 3. Imagen final optimizada
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production
RUN apk add --no-cache curl
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist

EXPOSE 2000
# USER appuser   # Descomentar en producción

CMD ["node", "dist/app.js"]
