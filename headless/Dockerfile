# Use Node.js 20.10.0 as the base image
FROM node:20.10.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to optimize caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the frontend files
COPY . .

# Build the frontend
RUN npm run build

# Expose frontend port
EXPOSE 8080

# Start the frontend
CMD ["npm", "run", "start"]
# Start the frontend with .env support
# CMD ["sh", "-c", "node -r dotenv/config npm start"]
