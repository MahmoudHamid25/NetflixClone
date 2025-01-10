# Base image
FROM node:18 AS builder

# Create app directory
WORKDIR /usr/src/app

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH
ENV PATH="/root/.bun/bin:$PATH"

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies using Bun
RUN bun install

# Bundle app source
COPY . .

# Copy the .env file if you have it
#COPY .env ./

# Creates a "dist" folder with the production build
RUN bun run build

# Use the same base image for the final build
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy the built files and necessary dependencies from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /root/.bun/bin/bun /usr/local/bin/
#COPY --from=builder /usr/src/app/.env ./

# Expose the port on which the app will run
EXPOSE 4000

# Start the server using the production build
CMD ["bun", "run", "start:prod"]
