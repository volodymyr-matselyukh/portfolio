#prepare client app
FROM node:alpine as client-base
RUN apk add --no-cache bash
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY babel.config.js ./
COPY babel-plugin-macros.config.js ./
COPY tsconfig.json ./
COPY .env ./
COPY commands-list.sh ./

COPY src ./src
COPY public ./public

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]
