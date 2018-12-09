FROM node:latest
COPY . /code
WORKDIR /code
RUN npm install --production
CMD npm run start:server
