curl \
    -d "client_id=tracker" \
    -d "username=test" \
    -d "password=password" \
    -d "grant_type=password" \
    "http://localhost:8080/realms/Tracker/protocol/openid-connect/token" \
    | jq -r '.access_token' \
    | sed 's/^/Bearer /' \
    | pbcopy;
