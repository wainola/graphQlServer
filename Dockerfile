FROM node:10.15.0
RUN mkdir -p /usr/server
WORKDIR /usr/server
COPY package*.json ./
RUN npm install --silent

COPY . .
EXPOSE 9001
CMD ["npm", "run", "dev"]