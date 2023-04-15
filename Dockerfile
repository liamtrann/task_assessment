FROM node:current-alpine
WORKDIR /app 

COPY package.json /app/
RUN yarn install

COPY . .
CMD ["yarn", "start"]