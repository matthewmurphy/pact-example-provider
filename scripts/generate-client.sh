#!/bin/bash
set -e

SPEC_PATH=$1
if [ -z "$SPEC_PATH" ]; then
    echo "SPEC_PATH is required (e.g. /local/spec/mySpec.yaml)"
    exit 1
fi

rm -rf gen/clients/typescript-axios
mkdir -p gen/clients/typescript-axios/dist

echo "Generating code using swagger-codegen..."
docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli-v3:3.0.54 generate \
    -i ${SPEC_PATH} \
    -l typescript-axios \
    -o /local/gen/clients/typescript-axios

echo "Building the client..."
cd gen/clients/typescript-axios
npm run build
