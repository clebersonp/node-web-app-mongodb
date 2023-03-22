# With docker manually
## create network for services
docker network create mongodb-network

## mongodb
docker run -d \
--network mongodb-network \
--name mongodb \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=admin \
-p 27017:27017 \
-v data-mongodb:/data/db \
mongo

## mongo-express
docker run -d \
--network mongodb-network \
--name mongo-express \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_SERVER=mongodb \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
mongo-express

## run the application locally
npm install
npm run start:local

#==================================================

## run the application as docker container
docker build -t web-app:1.0 .

## run image web-app
docker run -d \
-p 3000:3000 \
--network mongodb-network \
--name web-app \
web-app:1.0

## Stop all containers
docker stop $(docker ps -aq)

## Remove all containers
docker rm $(docker ps -aq)

## Remove all images
docker rmi $(docker images -q)

## run the application with docker
npm run start:docker

# With docker-compose

## Start:
docker-compose \
-f mongodb-docker-compose.yaml \
up -d

## Stop:
docker-compose \
-f mongodb-docker-compose.yaml \
down

## Rebuild with docker-compose
docker-compose \
-f mongodb-docker-compose.yaml up \
--build -d

# Application web page
http://localhost:3000/

# Mongo express web page
http://localhost:8081

# Create mongo database
user-db

# Create mongo collection for `user-db` database
users