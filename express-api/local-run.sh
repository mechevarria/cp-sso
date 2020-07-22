#!/usr/bin/env bash

credentials=$(cf service-key hdi_hana hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

echo "{\"hana\": $credentials }" > /tmp/default-services.json

export KEYCLOAK_URL=$KEYCLOAK_URL

npm run dev