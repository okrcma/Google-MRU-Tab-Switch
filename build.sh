#!/bin/bash

VERSION=$(jq -r ".version" src/manifest.json)

rm -rf dist
npx webpack
cp src/manifest.json dist
# zip -rm "dist/mru-tab-switch-$VERSION.zip" dist/*
