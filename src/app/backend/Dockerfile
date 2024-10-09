# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables if needed
# ENV NODE_ENV=production

# Run the app
CMD ["npm", "start"]
