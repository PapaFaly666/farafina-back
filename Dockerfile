# syntax=docker/dockerfile:1

########################################
# Stage 1 — build the NestJS app + Prisma client
########################################
FROM node:22-slim AS builder

# OpenSSL is required by Prisma's query engine.
RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install all dependencies (incl. dev) using the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the source and build.
COPY . .

# Generate the Prisma client, then compile TypeScript -> dist/.
RUN npx prisma generate && npm run build

########################################
# Stage 2 — lean runtime image
########################################
FROM node:22-slim AS runner

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ENV NODE_ENV=production

# Bring over the fully-installed node_modules from the builder. It already
# contains the generated Prisma client and the Prisma CLI needed to run
# `prisma migrate deploy` at container start-up.
COPY --from=builder /app/node_modules ./node_modules

# Application artefacts.
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY docker-entrypoint.sh ./

RUN chmod +x docker-entrypoint.sh

# Run as the non-root user shipped with the node image.
USER node

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/main"]
