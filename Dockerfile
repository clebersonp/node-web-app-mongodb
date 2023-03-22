# base image
FROM node:18-alpine

# create a path to work
RUN mkdir -p /home/app

# copy all /src host content to /home/app container folder
COPY ./src /home/app

# default work directory of the container
WORKDIR /home/app

# will execute inside the workdir and install all app dependencies
RUN npm install

# start the app
CMD [ "npm", "run", "start:docker" ]