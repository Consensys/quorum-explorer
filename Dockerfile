FROM node:lts-alpine3.18 as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN apk add --no-cache --virtual .gyp \
  python3 \
  make \
  g++ \
  && npm ci \
  && apk del .gyp

FROM node:lts-alpine3.18 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

FROM node:lts-alpine3.18 as runner
ENV NODE_ENV=production
WORKDIR /app
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /app/.env.production ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 25000
CMD ["npm", "run", "start"]