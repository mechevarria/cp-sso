#!/usr/bin/env bash

service=hana
plan=hdi-shared
instance=springboot-hana

cf create-service $service $plan $instance