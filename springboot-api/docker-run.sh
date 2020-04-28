#!/usr/bin/env bash

hasJq=$(which jq)

if [[ -z "$hasJq" ]]; then
  echo "please install jq: 'sudo apt-get install -y jq'"
  exit 1
fi

cf service-key hdi-hana hdi-hana-key | sed -n 3,14p > temp.json

# create network for other containers to communicate via name
docker network create app-net

docker rm springboot-api

docker run \
    --name=springboot-api \
    --network app-net \
    -p 8080:8080 \
    --env KEYCLOAK=$KEYCLOAK \
    --env KEYCLOAK_URL=$KEYCLOAK_URL \
    --env VCAP_SERVICES_HDI-HANA_CREDENTIALS_HOST=$(jq .host temp.json) \
    --env VCAP_SERVICES_HDI-HANA_CREDENTIALS_USER=$(jq .user temp.json) \
    --env VCAP_SERVICES_HDI-HANA_CREDENTIALS_PASSWORD=$(jq .password temp.json) \
    quay.io/mechevarria/springboot-api

rm temp.json