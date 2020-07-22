import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import xsenv from '@sap/xsenv';
import hdbext from '@sap/hdbext';
import * as statusCtrl from './controllers/status';
import * as searchCtrl from './controllers/search';
import * as eventCtrl from './controllers/event';
import * as mapCtrl from './controllers/map';
import { KeycloakAuth } from './middlewares/keycloak-auth';

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

const services = xsenv.getServices({ hana: { tag: 'hana' } }, '/tmp/default-services.json');
app.use('/', hdbext.middleware(services.hana));

if (process.env.KEYCLOAK === 'true') {
    console.info('Securing with keycloak');
    const keycloakAuth = new KeycloakAuth('express', process.env.KEYCLOAK_URL, 'cp-sso');

    app.use(keycloakAuth.handler());
    app.use(keycloakAuth.middleware());
    app.use(keycloakAuth.protect());
} else {
    console.info('Keycloak is disabled');
}

const router = express.Router();
router.route('/status').get(statusCtrl.get);
router.route('/event').get(eventCtrl.get);
router.route('/map').post(mapCtrl.post);
router.route('/search').get(searchCtrl.get);

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.info(`http server started on port ${port}`);
});