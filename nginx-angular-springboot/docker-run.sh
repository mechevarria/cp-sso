#!/usr/bin/env bash

docker run \
    -p 80:80 \
    --network app-net \
    --env MAPBOX_TOKEN=$MAPBOX_TOKEN \
    --env KEYCLOAK=$KEYCLOAK \
    --env SPRINGBOOT_URL=http://springboot-api:8080/ \
    quay.io/mechevarria/nginx-angular-springboot