FROM node:14

WORKDIR /server.js

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]