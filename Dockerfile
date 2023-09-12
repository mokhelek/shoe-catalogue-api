FROM node:18-alpine

WORKDIR /shoes_api

COPY . /shoes_api

RUN npm install

EXPOSE 3000

CMD ["node", "index.js"]