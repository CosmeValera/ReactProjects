import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js"

const keycloakConfig: KeycloakConfig = {
  // eslint-disable-next-line no-undef
  url: process.env.REACT_APP_KEYCLOAK_URL,
  realm: "master",
  clientId: "aggregator",
}

const keycloakInstance = new Keycloak(keycloakConfig)

export const initOptions: KeycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: true,
  pkceMethod: 'S256',
}

export default keycloakInstance
