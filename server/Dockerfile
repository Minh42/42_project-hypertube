FROM node:8-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && npm i --save nodemon \
    && apk del .gyp

# Bundle app source
COPY . /usr/src/app/

CMD [ "nodemon", "server/server.js" ]