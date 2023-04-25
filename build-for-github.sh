#!/usr/bin/env bash

echo "Changing dir to master repo"
cd ../src-benchmark

echo "Redacting keys files"
echo "export const environmentKeys = null;" > benchmark/js/stubs/environment-keys.js
echo "export const keys = null;" > benchmark/js/stubs/pan-encryption-keys.js

echo "Building for github.io"
npm run build:github

echo "Resetting redacted files"
git checkout benchmark/js/stubs/environment-keys.js
git checkout benchmark/js/stubs/pan-encryption-keys.js
