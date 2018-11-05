FROM node:8

WORKDIR /usr/src/app/client

COPY package*.json ./

RUN npm install

COPY . /usr/src/app/client

CMD [ "npm", "start" ]