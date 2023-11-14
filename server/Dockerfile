# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm install

# Copy the rest of the application's source code into the container
COPY . .

# Make port 8000 available to the outside of the container
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]
