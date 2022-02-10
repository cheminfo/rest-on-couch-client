#!/bin/bash

set -e

/wait.sh

response=$(curl --write-out %{http_code} --silent --output /dev/null http://couchdb:5984/_users)

if [ ${response} == "404" ]
then

echo "Database is not instantiated. Create it."

curl -X POST -H "Content-Type: application/json" http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@couchdb:5984/_cluster_setup -d '{"action": "finish_cluster"}'

echo $COUCHDB_USER

# Create rest-on-couch users and databases
curl -X POST http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@couchdb:5984/_users \
     -H 'Content-Type: application/json' \
     -d '{ "_id": "org.couchdb.user:rest-on-couch", "name": "rest-on-couch", "type": "user", "roles": [], "password": "'${COUCHDB_ROC_SERVER_PASSWORD}'" }'

curl -X POST http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@couchdb:5984/_users \
     -H 'Content-Type: application/json' \
     -d '{ "_id": "org.couchdb.user:admin@cheminfo.org", "name": "admin@cheminfo.org", "type": "user", "roles": [], "password": "'${COUCHDB_ROC_ADMIN_PASSWORD}'" }'

curl -X PUT http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@couchdb:5984/test
curl -X PUT http://${COUCHDB_USER}:${COUCHDB_PASSWORD}@couchdb:5984/test/_security \
     -H 'Content-Type: application/json' \
     -d '{ "admins": { "names": ["rest-on-couch"], "roles": [] }, "members": { "names": ["rest-on-couch"], "roles": [] } }'

else

echo "Response: ${response}"
echo "CouchDB is already initialized, nothing to do"

fi