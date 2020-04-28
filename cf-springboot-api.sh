#!/usr/bin/env bash

status=$(cf app keycloak-coreui | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
else
  keycloak_url=https://$(cf app keycloak-coreui | awk '{print $2}' | sed -n 5p)/auth
  echo keycloak_url=$keycloak_url
fi

service=hdi_hana
status=$(cf service $service | sed -n 3p)
if [[ $status = "FAILED" ]]; then
  exit 1
fi

app=springboot-api

cf push $app \
    -m 256M \
    -k 1024M \
    --docker-image quay.io/mechevarria/$app \
    --no-start

cf se $app KEYCLOAK_URL $keycloak_url
cf se $app KEYCLOAK false

# bind hana service
cf bind-service $app $service

cf start $app