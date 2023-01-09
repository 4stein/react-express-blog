FROM node:16.12.0

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN npm install\
        && npm install typescript -g
COPY . .
RUN tsc

EXPOSE 5000

CMD ["node", "./dist/index.js"]
