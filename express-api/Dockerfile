FROM node:12

WORKDIR /usr/src/app

COPY .npmrc ./

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]