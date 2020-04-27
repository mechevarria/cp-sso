#!/usr/bin/env bash

multiapps=$(cf plugins | grep multiapps)
if [[ -z "$multiapps" ]]; then
  echo "multiapps plugin is required: 'cf install-plugin multiapps'"
  exit 1
fi

mbt=$(npm -g ls --depth=0 | grep mbt)
if [[ -z "$mbt" ]]; then
  echo "cloud-mta-build-tool is required: 'npm install -g mbt'"
  exit 1
fi

mbt build -p cf -t .

mtar=$(ls cp-hana*.mtar)
cf deploy $mtar -f

cf start cp-hana