#!/bin/bash

# read -p "" var
read -p "Enter Database Name >> " name
read -p "Enter scheme name (mongodb or mongosrv) >> " scheme
read -p "Enter Username >> " username
read -p "Enter Password >> " password
read -p "Enter server address >> " serverAddress
read -p "Enter Port >> " serverPort 
read -p "Enter Auth Source >> " authSource


tee .env <<<"
DATABASE_NAME=$name
DATABASE_SCHEME=$scheme
MONGO_USERNAME=$username
MONGO_PASSWORD=$password
MONGO_ADDRESS=$serverAddress
MONGO_PORT=$serverPort
MONGO_AUTH_SOURCE=$authSource
"
# echo "" >> .env
echo 'DB_URI=${DATABASE_SCHEME}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_ADDRESS}:${MONGO_PORT}/${DATABASE_NAME}?authSource=${MONGO_AUTH_SOURCE}&retryWrites=true&w=majority' >> .env