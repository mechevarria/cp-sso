#!/usr/bin/env bash

docker build \
  -t quay.io/mechevarria/keycloak-coreui .

docker push quay.io/mechevarria/keycloak-coreui