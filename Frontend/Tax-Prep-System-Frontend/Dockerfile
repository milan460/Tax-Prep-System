# Use a node base image which comes with npm
FROM node:latest

# create and set our working dir to /app
WORKDIR /app

# copy our package.json (and package-lock.json if available) to /app
COPY package.json package-lock.json* ./

# install our packages
RUN npm install

# copy the rest of the project files
COPY . .

# build for production using vite build
RUN npm run build

CMD ["npm", "run", "dev", "--", "--host"]

# # using bun (https://bun.sh) as a package manager, a faster npm alternative
# FROM oven/bun:1

# # create and set our working dir to /app
# WORKDIR /app

# # copy our package.json to /app
# COPY package.json .

# # install our packages
# RUN bun install

# # copy the rest of the project files
# COPY . .

# # build for production using vite build
# RUN bun run build

# CMD ["bun", "run"]




# # Use an official Node runtime as a parent image
# FROM node:14

# # Set the working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

# # Bundle app source
# COPY . .

# # Build the application
# RUN npm run build

# # Install serve to run the application
# RUN npm install -g serve

# # Start the application
# CMD ["serve", "-s", "build", "-l", "3000"]
