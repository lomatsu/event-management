FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

EXPOSE 3001

CMD ["npm", "build"]