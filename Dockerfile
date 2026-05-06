# Use Node.js official image
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile --prod

# Production stage
FROM base AS production

# Copy built files
COPY build ./build

# Expose port
EXPOSE 3333

# Start the app
CMD ["node", "build/server.js"]