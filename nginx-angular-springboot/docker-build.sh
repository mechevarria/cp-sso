#!/usr/bin/env bash

docker build -t quay.io/mechevarria/nginx-angular-springboot .

docker push quay.io/mechevarria/nginx-angular-springboot