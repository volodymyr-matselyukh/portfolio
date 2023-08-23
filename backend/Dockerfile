FROM node:alpine as base
RUN apk add --no-cache bash
WORKDIR /app

COPY . .

RUN npm ci

CMD ["node", "server.js"]