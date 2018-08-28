#!/bin/bash
export $(envsubst < config.env | xargs) > /dev/null 2>&1
docker-compose -f ./infrastructure/docker-letsencrypt.yml up --build 