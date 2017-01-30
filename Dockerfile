FROM node:6

# Create app directory
WORKDIR /var/app/project

# Install app dependencies
COPY package.json /var/app/project
RUN npm install

# Bundle app source
# COPY app /var/app/project/app

CMD [ "npm", "start" ]
