#!/usr/bin/env bash
bash ./build-for-github.sh

echo "Copying master files & artifacts"
cp ../src-benchmark/benchmark/index.html ./benchmark/
cp ../src-benchmark/benchmark/js/main.js ./benchmark/js/
cp -rf ../src-benchmark/benchmark/css ./benchmark/

git add --all
git commit -am 'chore: pushing latest to github.io'
git push
