FROM node:18.18.2-alpine3.18


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY . ./

# Exports
EXPOSE 4004
CMD [ "npm", "run", "start" ]