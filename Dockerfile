FROM node:latest
ADD . /code
WORKDIR /code
RUN npm install --production
CMD npm run start:server
