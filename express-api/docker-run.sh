#!/usr/bin/env bash

credentials=$(cf service-key hdi_hana hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

echo "{\"hana\": $credentials }" > /tmp/default-services.json

docker rm express-api

docker run \
  --name=express-api \
  -p 3000:3000 \
  --network app-net \
  --env KEYCLOAK=$KEYCLOAK \
  --env KEYCLOAK_URL=$KEYCLOAK_URL \
  --mount type=bind,source=/tmp/default-services.json,target=/tmp/default-services.json \
  quay.io/mechevarria/express-api
