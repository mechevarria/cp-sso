#!/usr/bin/env bash

keycloak_url=$(cf apps | awk '{print $6}' | grep keycloak)
if [[ -z "$keycloak_url" ]]; then
  echo "Could not find Keycloak application. Exiting"
  exit 1
else
  keycloak_url=https://$(cf apps | awk '{print $6}' | grep keycloak)/auth
  echo keycloak_url=$keycloak_url
fi

springboot_url=$(cf apps | awk '{print $6}' | grep springboot)
if [[ -z "$springboot_url" ]]; then
  echo "Could not find Springboot application. Exiting"
  exit 1
else
  springboot_url=https://$(cf apps | awk '{print $6}' | grep springboot)/
  echo springboot_url=$springboot_url
fi

app=nginx-angular-springboot

cf push $app \
    -m 64M \
    -k 256M \
    --docker-image quay.io/mechevarria/$app \
    --no-start

cf se $app MAPBOX_TOKEN $MAPBOX_TOKEN
cf se $app KEYCLOAK_URL $keycloak_url
cf se $app SPRINGBOOT_URL $springboot_url
cf se $app KEYCLOAK true

cf start $app