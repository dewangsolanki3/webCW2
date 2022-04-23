FROM node:14

WORKDIR /client/c-w-app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]