FROM node:lts-alpine as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache --virtual .gyp \
  python3 \
  make \
  g++ \
  && npm ci \
  && apk del .gyp

FROM node:lts-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:lts-alpine as runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_PUBLIC_QE_BASEPATH "/explorer"
ENV QE_CONFIG_PATH "/app/config.json"
ENV QE_BACKEND_URL "http://localhost:25000"
ENV PORT 25000
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 25000
CMD ["npm", "run", "start"]