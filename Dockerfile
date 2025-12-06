# syntax=docker.io/docker/dockerfile:1

# === BASE STAGE ===
FROM node:20-alpine AS base
# Ensure the base image is set up for the build and run environments

# === DEPENDENCIES STAGE ===
FROM base AS deps
WORKDIR /app

# Only copy lock files and package.json to bust cache only when dependencies change
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Use a specific registry if required, otherwise omit.
# RUN npm config set registry https://registry.npmjs.org/

# Install dependencies based on the preferred package manager using the correct command
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Error: Lockfile not found." && exit 1; \
  fi

# === BUILDER STAGE ===
FROM base AS builder
WORKDIR /app
# Copy installed dependencies from the 'deps' stage
COPY --from=deps /app/node_modules /app/node_modules
# Copy application source code
COPY . .

# Environment variables for build time (passed as ARGs, then set as ENVs)
# Use ARG for secrets that don't need to be in the final image metadata (though these are public keys)
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_IMAGE_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_IMAGE_BASE_URL=$NEXT_PUBLIC_IMAGE_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# Disable Next.js telemetry (optional, for clean builds)
ENV NEXT_TELEMETRY_DISABLED=1

# Run the build command
RUN \
  if [ -f package-lock.json ]; then npm run build; \
  elif [ -f yarn.lock ]; then yarn run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Error: Lockfile not found." && exit 1; \
  fi

# === RUNNER STAGE (Production) ===
# This image is minimized and only contains necessary runtime files
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Disable telemetry during runtime too
ENV NEXT_TELEMETRY_DISABLED=1 

# Set up user and group
# These are necessary for security and are correct as you have them
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential files from the builder stage with correct ownership
COPY --from=builder /app/public ./public
# Copy the entire standalone output directory
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static files. These must go into the .next/static folder
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# The command to run the Next.js server
CMD ["node", "server.js"]