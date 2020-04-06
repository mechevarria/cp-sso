#!/usr/bin/env bash

docker build -t quay.io/mechevarria/springboot-api .

docker push quay.io/mechevarria/springboot-api