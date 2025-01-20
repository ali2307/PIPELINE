FROM node:latest
WORKDIR /root/PIPELINE
ADD . .
RUN npm install
