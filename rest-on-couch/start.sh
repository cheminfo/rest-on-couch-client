#!/usr/bin/env bash

/create_db.sh

# https://unix.stackexchange.com/a/196053/116499
exec node /rest-on-couch-source/bin/rest-on-couch-server.js