import Keycloak from "keycloak-connect";

const realm = process.env.KC_REALM || "Tracker";
const url = process.env.KC_URL || "http://keycloak:8080/";
const resource = process.env.KC_RESOURCE || "tracker-api";

export const generateKeycloak = (): Keycloak.Keycloak => {
    return new Keycloak(
        {},
        {
            realm,
            "auth-server-url": url,
            "ssl-required": "none",
            "bearer-only": true,
            resource,
            "confidential-port": 0,
        }
    );
};
