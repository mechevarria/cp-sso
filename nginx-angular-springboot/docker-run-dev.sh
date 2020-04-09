#!/usr/bin/env bash

# create network for other containers to communicate via name
docker network create app-net

docker run \
  -p 80:80 \
  --network app-net \
  --env MAPBOX_TOKEN=$MAPBOX_TOKEN \
  --env KEYCLOAK=$KEYCLOAK \
  --env SPRINGBOOT_URL=http://springboot-api:8080/ \
  --mount type=bind,source=${PWD}/dist,target=/usr/share/nginx/html \
  quay.io/mechevarria/nginx-angular-springboot
