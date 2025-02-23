# Use Node.js 20.10.0 as the base image
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the frontend files (AFTER installing dependencies)
COPY . .

# Build the frontend (this step will now persist correctly)
# RUN npm run docker

# Expose frontend port
EXPOSE 8080

# Start the frontend
# CMD ["npx", "serve", "-s", "dist", "-l", "8080"]
CMD ["npm", "run", "start"]
