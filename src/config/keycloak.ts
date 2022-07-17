import Keycloak from "keycloak-connect";

// Keycloak.prototype.redirectToLogin = function() {
//     // By default, Keycloak attempts to redirect unauthenticated requests to the login page.
//     // We want everything login(or out) related to go through the client, for now.
//     // This causes unauthenticated requests to get a 403: Forbidden, instead of redirecting.
//     return false;
// };

const realm = process.env.KC_REALM || "Tracker";
const url = process.env.KC_URL || "http://localhost:8082/";
const resource = process.env.KC_CLIENT_ID || "tracker";

export const generateKeycloak = (): Keycloak.Keycloak => {
    return new Keycloak(
        {},
        {
            realm,
            "auth-server-url": url,
            "ssl-required": "external",
            resource,
            "confidential-port": 0,
        }
    );
};
