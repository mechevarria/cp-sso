#!/usr/bin/env bash

# list domains, print first column, print 3rd line
domain=$(cf domains | awk '{print $1}' | sed -n 3p)
keycloak_app=keycloak-coreui
keycloak_url=https://$keycloak_app.$domain/auth

echo $keycloak_url