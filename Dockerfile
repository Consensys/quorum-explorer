# pull official base image
FROM node:16-alpine3.14

# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
# add app
COPY . ./
RUN npm i

# start app
CMD ["npm", "run", "start"]