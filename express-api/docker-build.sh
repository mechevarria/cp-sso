#!/usr/bin/env bash

docker build -t quay.io/mechevarria/express-api .

docker push quay.io/mechevarria/express-api