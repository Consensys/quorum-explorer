FROM node:16-alpine3.14

ENV NODE_ENV production
ENV QE_BASEPATH "/explorer"
ENV PORT 25000
EXPOSE 25000

RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm install

# Copying source files
COPY . /app

# NOTE: not doing this here because there is no safe way to pass in 
# a config file that works without issues (CORS & exposing secrets)
# We can use an env var with the config file as base64 but this
# potentially exposes secrets. So do the following step in your 
# dockerfile after copying your config file to /app/src/config/config.js
# 
# RUN npm run build

CMD "npm" "run" "start"