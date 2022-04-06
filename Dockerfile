FROM node:16-alpine3.14

ENV PORT 3000
ENV NODE_ENV production
ENV QE_BASEPATH "/explorer"

RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm install

# Copying source files
COPY . /app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app in prod mode
CMD "npm" "run" "start"