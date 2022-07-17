#!/bin/bash

docker run -p 8082:8080 --name keycloak -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
    -e KC_DB="postgres" -e KC_DB_USERNAME="postgres" -e KC_HOSTNAME_STRICT=false \
    -e KC_DB_URL="jdbc:postgresql://host.docker.internal:5432/keycloak" -e KC_DB_PASSWORD="tracker" \
    -e KC_HOSTNAME="localhost" -e KC_HOSTNAME_PORT="8082" -e KC_HTTP_ENABLED=true \
    -e KC_HOSTNAME_STRICT_HTTPS=false \
    -d quay.io/keycloak/keycloak:18.0.2 start --auto-build
