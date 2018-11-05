FROM node:8

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install \
    && npm i -g nodemon --save

COPY . /usr/src/app/server

CMD [ "node", "server.js" ]