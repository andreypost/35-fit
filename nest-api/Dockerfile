# Use Node.js 20.10.0 as the base image
FROM node:20.10.0-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the app files
COPY . .

# Expose the backend port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:docker"]
