FROM node:16-alpine3.12 as builder
WORKDIR /node-server
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD npm run start




