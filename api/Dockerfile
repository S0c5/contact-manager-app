FROM node:10
WORKDIR /app/src
COPY package.json /app/src
RUN npm install --silent 
ADD . /app/src
CMD npm start