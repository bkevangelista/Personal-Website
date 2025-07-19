# Use an official node image as the base (Node version 20)
FROM node:23-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8080

# Declare build arguments
ARG NEXT_PUBLIC_BACKEND_API_URL

# Make it available as an environment variable
ENV NEXT_PUBLIC_BACKEND_API_URL=$NEXT_PUBLIC_BACKEND_API_URL

# Build and Start the application
RUN npm run build
CMD ["npm", "start"]