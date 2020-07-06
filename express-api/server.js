'use strict';

const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const xsenv = require('@sap/xsenv');
const hdbext = require('@sap/hdbext');

let app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ extended: true }));
app.use(compression());

// add HANA client to all incoming requests. json file is only read when not running on XS Advanced Server
const services = xsenv.getServices({ hana: { tag: 'hana' } }, '/tmp/default-services.json');
app.use('/', hdbext.middleware(services.hana));

// configure keycloak if enabled
const keycloak = require('./middlewares/keycloak')(app);
app.use(keycloak);

// configure route handlers
const eventCtrl = require('./controllers/event');
const mapCtrl = require('./controllers/map');
const searchCtrl = require('./controllers/search');
const statusCtrl = require('./controllers/status');

const router = express.Router();
router.route('/status').get(statusCtrl);
router.route('/event').get(eventCtrl);
router.route('/map').post(mapCtrl);
router.route('/search').get(searchCtrl);

app.use('/', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.info(`http server started on port ${port}`);
});