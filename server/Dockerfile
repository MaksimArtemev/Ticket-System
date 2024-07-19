# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# If your server uses a different port, replace 3000 with your port number
EXPOSE 8000

# Define environment variable
ENV NODE_ENV=production

# Run node server.js (or your start script) when the container launches
CMD ["node", "app.js"]