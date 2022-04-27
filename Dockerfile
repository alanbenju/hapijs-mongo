FROM node:latest

RUN mkdir node-mongo

ADD . /node-mongo
WORKDIR /node-mongo

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]