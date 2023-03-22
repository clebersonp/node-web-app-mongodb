# Run the app with docker manually
## Create a docker network for the following services
    docker network create mongodb-network

## Run the mongo image
    docker run -d \
    --network mongodb-network \
    --name mongodb \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -p 27017:27017 \
    -v data-mongodb:/data/db \
    mongo

## Run the mongo-express image
    docker run -d \
    --network mongodb-network \
    --name mongo-express \
    -p 8081:8081 \
    -e ME_CONFIG_MONGODB_SERVER=mongodb \
    -e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
    -e ME_CONFIG_MONGODB_ADMINPASSWORD=admin \
    mongo-express

## Run the web app instance locally
Run the following command in the **_./src_** folder:
<br>

    npm install && npm run start:local

<hr>

## Or run web app as docker container instead of locally
Run the following command in the root **_./_** folder:
<br>

    docker build -t web-app:1.0 .

## Run image for web app
    docker run -d \
    -p 3000:3000 \
    --network mongodb-network \
    --name web-app \
    web-app:1.0

<hr>

## Stop all containers
    docker stop $(docker ps -aq)

## Remove all containers
    docker rm $(docker ps -aq)

## Remove all images
    docker rmi $(docker images -q)

<hr>

# Run the whole app with docker-compose
Run the following commands in the root **_./_** folder:

## Start the app:
    docker-compose \
    -f mongodb-docker-compose.yaml \
    up -d

## Stop the app:
    docker-compose \
    -f mongodb-docker-compose.yaml \
    down

## Rebuild any image with docker-compose
    docker-compose \
    -f mongodb-docker-compose.yaml up \
    --build -d

<hr>

# App web page
http://localhost:3000/

# Mongo express web page
http://localhost:8081

<hr>

# Create mongo database with mongo-express
Create a **_mongodb_** with the name `user-db`

# Create mongo collection for `user-db` database
Create a mongo collection named `users` for the `user-db` database

# The expected result
![mongo-express](https://user-images.githubusercontent.com/9445673/226988721-f75ed3a9-4c3d-4b67-919b-ad9ac016e261.jpeg)
