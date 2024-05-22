#!/bin/bash
set -e

BRANCH_NAME=${BRANCH_NAME:=$(git rev-parse --abbrev-ref HEAD)}
COMMIT_HASH=${COMMIT_HASH:=$(git rev-parse --short HEAD)}

docker run --rm \
    -w ${PWD} \
    -v ${PWD}:${PWD} \
    pactfoundation/pact-cli:1 \
    publish \
    ${PWD}/tests/pact/gen/pacts \
    --broker-base-url ${PACT_BROKER_URL} \
    --broker-token ${PACT_BROKER_TOKEN} \
    --consumer-app-version ${COMMIT_HASH} \
    --branch ${BRANCH_NAME}
