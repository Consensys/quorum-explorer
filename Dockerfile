FROM node:16-alpine3.14

ENV NODE_ENV production
ENV QE_BASEPATH "/explorer"
ENV QE_CONFIG_PATH "/app/config.json"
ENV QE_BACKEND_URL "http://localhost:25000"
ENV PORT 25000
EXPOSE 25000

RUN mkdir -p /app
WORKDIR /app

# Installing dependencies
COPY package*.json /app/
RUN npm install

# Copying source files
COPY . /app

RUN npm run build

CMD "npm" "run" "start"