#!/usr/bin/env bash

credentials=$(cf service-key hdi_hana hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

# create network for other containers to communicate via name
docker network create app-net

docker rm springboot-api

export VCAP_SERVICES="{\"hana\": [{ \"name\": \"hdi_hana\", \"credentials\": $credentials }]}"

docker run \
    --name=springboot-api \
    --network app-net \
    -p 8080:8080 \
    --env KEYCLOAK=$KEYCLOAK \
    --env KEYCLOAK_URL=$KEYCLOAK_URL \
    --env VCAP_SERVICES="$VCAP_SERVICES" \
    quay.io/mechevarria/springboot-api