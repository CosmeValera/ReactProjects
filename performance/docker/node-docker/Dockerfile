# syntax=docker/dockerfile:1

From node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]