import Keycloak, { KeycloakConfig } from 'keycloak-connect';
import session, { MemoryStore } from 'express-session';
import { RequestHandler } from 'express';

export class KeycloakAuth {
    private keycloak: Keycloak.Keycloak;
    private kcHandler: RequestHandler;

    constructor(resource: string, authUrl: string, realm: string) {
        const kcConfig: KeycloakConfig = {
            'resource': resource,
            'bearer-only': true,
            'auth-server-url': authUrl,
            'realm': realm,
            'confidential-port': 8443,
            'ssl-required': 'external'
        };
        const memoryStore: MemoryStore = new session.MemoryStore;

        this.keycloak = new Keycloak({ store: memoryStore }, kcConfig);
        this.kcHandler = session({
            secret: 'keycloak-session-secret',
            resave: false,
            saveUninitialized: true,
            store: memoryStore 
        });
    }

    handler() {
        return this.kcHandler;
    }

    middleware() {
        return this.keycloak.middleware();
    }

    protect() {
        return this.keycloak.protect(null);
    }
}