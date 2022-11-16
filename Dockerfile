FROM node:alpine
RUN mkdir /app
WORKDIR /app

COPY package*.json .

COPY .env.development .

COPY ./dist .

RUN ls
RUN npm install

CMD ["ls -l"]

EXPOSE 4000