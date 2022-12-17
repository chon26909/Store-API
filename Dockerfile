FROM node:alpine
RUN mkdir /app
WORKDIR /app

# COPY package*.json .
COPY . .
RUN npm install
RUN npm run build
# COPY .env .
# COPY ./dist .

# RUN ls
# RUN npm install
WORKDIR /dist
RUN ls -l
EXPOSE 4000
CMD ["node", "index.js"]

