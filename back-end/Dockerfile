FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5011

CMD [ "node", "index.js" ]
