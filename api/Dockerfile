# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the api directory to the working directory
COPY package.json /usr/src/app

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code from the api directory to the working directory
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]
