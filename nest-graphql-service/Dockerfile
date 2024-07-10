# Start from the latest LTS version of Node.js
FROM node:20

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy the rest of the application to the working directory
COPY . .

# Install dependencies
RUN npm install

# Install sqlite3
RUN npm -g install sqlite3

# Build the application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start:prod" ]