#!/usr/bin/env bash
set -e

FORM_VERSION=$(node -p "require('./package.json').version")
echo "FORM_VERSION=$FORM_VERSION" > version.env
echo "Published version: $FORM_VERSION"
