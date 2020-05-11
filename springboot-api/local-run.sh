#!/usr/bin/env bash

credentials=$(cf service-key hdi_hana hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

export VCAP_SERVICES="{\"hana\": [{ \"name\": \"hdi_hana\", \"credentials\": $credentials }]}"

export KEYCLOAK_URL=$KEYCLOAK_URL

mvn spring-boot:run