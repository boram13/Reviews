FROM node:18.18.2-alpine3.18

WORKDIR /REVIEWS

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4004

CMD [ "node", "app.js"]