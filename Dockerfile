FROM node:latest

# Install required dependencies
RUN apt update && apt upgrade -y && apt install -y curl git

# Install NVM and use it to install Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Set environment variables for NVM and Node.js
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=18.20.2

# Install Node.js using NVM
RUN . $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use $NODE_VERSION && nvm alias default $NODE_VERSION

# Clone the repository and build the project
RUN git clone http://host.tranetech.ae:9991/ecommerce-web-site.git
ADD ../../ ecommerce-web-site
WORKDIR ecommerce-web-site
RUN npm install && npm run build
