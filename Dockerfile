# Build Stage
FROM node:18 AS builder

WORKDIR /usr/src/app

# Copy package.json and package-lock.json separately to take advantage of Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the specified port
EXPOSE 3000

# Start the application
CMD ["npx", "next", "start"]