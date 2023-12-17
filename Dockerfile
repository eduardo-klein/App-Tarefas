FROM node:18

WORKDIR /src

COPY package*.json .

RUN npm install

EXPOSE 4000 3306

COPY . .

CMD ["node","start.js"]
