#!/usr/bin/env bash

docker run \
    -p 8080:8080 \
    --env KEYCLOAK=$KEYCLOAK \
    quay.io/mechevarria/springboot-api