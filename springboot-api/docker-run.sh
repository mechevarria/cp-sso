#!/usr/bin/env bash

hasJq=$(which jq)

if [[ -z "$hasJq" ]]; then
  echo "please install jq: 'sudo apt-get install -y jq'"
  exit 1
fi

credentials=$(cf service-key hdi_hana hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

# create network for other containers to communicate via name
docker network create app-net

docker rm springboot-api

docker run \
    --name=springboot-api \
    --network app-net \
    -p 8080:8080 \
    --env KEYCLOAK=$KEYCLOAK \
    --env KEYCLOAK_URL=$KEYCLOAK_URL \
    --env VCAP_SERVICES_HDI_HANA_CREDENTIALS_URL=$(echo $credentials | jq -r .url) \
    --env VCAP_SERVICES_HDI_HANA_CREDENTIALS_USER=$(echo $credentials | jq -r .user) \
    --env VCAP_SERVICES_HDI_HANA_CREDENTIALS_PASSWORD=$(echo $credentials | jq -r .password) \
    quay.io/mechevarria/springboot-api