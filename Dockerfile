FROM node:14

WORKDIR /api

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm","start"]