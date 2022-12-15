#!/bin/bash
set +e
cp -R /enc-data/* /usr/mware/certs
cd /usr/mware/repo
sleep 10
npm run start:devwkspce
