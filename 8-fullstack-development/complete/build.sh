#!/bin/bash

set -ex

npm run build
rm -rf ../../7-intro-to-databases/complete/public/static
cp -r build/* ../../7-intro-to-databases/complete/public
