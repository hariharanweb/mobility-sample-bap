FROM node:14
WORKDIR /app
COPY src /app/src
COPY .env /app/
COPY package*.json /app/
RUN npm install
EXPOSE 2010
CMD ["npm", "start"]