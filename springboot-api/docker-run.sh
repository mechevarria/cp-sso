#!/usr/bin/env bash

# create network for other containers to communicate via name
docker network create app-net

docker rm springboot-api

docker run \
    --name=springboot-api \
    --network app-net \
    -p 8080:8080 \
    --env KEYCLOAK=$KEYCLOAK \
    --env KEYCLOAK_URL=$KEYCLOAK_URL \
    quay.io/mechevarria/springboot-api