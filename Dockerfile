# The base image on which everything else will be built
FROM node:latest

# Create a new directory for the application
RUN mkdir -p /usr/app/sourcequote

# Set the working directory to the new directory
WORKDIR /usr/app/sourcequote

# Copy the package.json file to the new directory
COPY package.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application to the new directory
COPY . .

# Build the application
# RUN npm run build

# Meta - Expose the port on which the application will run
EXPOSE 8787

# Meta- Run the application via this command when user start the container
# CMD ["npm", "run", "local"]
CMD ["npm", "start"]
