#!/bin/bash
set -e

PACTICIPANT=$1
if [ -z "$PACTICIPANT" ]; then
    echo "PACTICIPANT is required as first argument (pact-example-provider or pact-example-swagger-codegen)"
    exit 1
fi

COMMIT_HASH=${COMMIT_HASH:=$(git rev-parse --short HEAD)}

docker run --rm \
    pactfoundation/pact-cli:1 \
    pact-broker record-release \
    --pacticipant ${PACTICIPANT} \
    --broker-base-url ${PACT_BROKER_URL} \
    --broker-token ${PACT_BROKER_TOKEN} \
    --version ${COMMIT_HASH} \
    --environment 'mainline'
