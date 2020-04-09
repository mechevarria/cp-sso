#!/usr/bin/env bash

# create network for other containers to communicate via name
docker network create app-net

docker rm springboot-api

docker run \
    --name=springboot-api \
    --network app-net \
    -p 8080:8080 \
    --env KEYCLOAK=$KEYCLOAK \
    quay.io/mechevarria/springboot-api