FROM node:8

# Create app directory
WORKDIR /var/www

# Install app dependencies
COPY package.json /var/www
RUN npm install

# Bundle app source
# COPY . /var/www/app
# COPY scss /var/www/scss

CMD [ "npm", "start" ]
