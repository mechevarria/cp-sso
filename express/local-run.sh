#!/usr/bin/env bash
hasJq=$(which jq)
if [[ -z "$hasJq" ]]; then
  echo "install jq: 'sudo apt-get install -y jq'"
  exit 1
fi

credentials=$(cf service-key hdi_hana hdi-hana-key | sed -n 3,14p)
if [[ -z "$credentials" ]]; then
  echo "service-key 'hdi-hana-key' not found"
  exit 1
fi

export VCAP_SERVICES_HDI_HANA_CREDENTIALS_HOST=$(echo $credentials | jq -r .host)
export VCAP_SERVICES_HDI_HANA_CREDENTIALS_PORT=$(echo $credentials | jq -r .port)
export VCAP_SERVICES_HDI_HANA_CREDENTIALS_USER=$(echo $credentials | jq -r .user)
export VCAP_SERVICES_HDI_HANA_CREDENTIALS_PASSWORD=$(echo $credentials | jq -r .password)

export KEYCLOAK_URL=$KEYCLOAK_URL

npm run start