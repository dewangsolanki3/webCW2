FROM node:14

WORKDIR /usr/src/app
# WORKDIR /server.js

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]