#!/usr/bin/env bash

hasJq=$(which jq)

if [[ -z "$hasJq" ]]; then
  echo "please install jq: 'sudo apt-get install -y jq'"
  exit 1
fi


export KEYCLOAK=false
export KEYCLOAK_URL=$KEYCLOAK_URL

cf service-key hdi-hana hdi-hana-key | sed -n 3,14p > temp.json

export VCAP_SERVICES_HDI-HANA_CREDENTIALS_HOST=$(jq .host temp.json)
export VCAP_SERVICES_HDI-HANA_CREDENTIALS_USER=$(jq .user temp.json)
export VCAP_SERVICES_HDI-HANA_CREDENTIALS_PASSWORD=$(jq .password temp.json)

rm temp.json

mvn spring-boot:run