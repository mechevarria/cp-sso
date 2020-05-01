const http = require('http');
const compression = require('compression');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const xsenv = require('@sap/xsenv');
const hdbext = require('@sap/hdbext');
const Keycloak = require('keycloak-connect');

let app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined'));
app.use(bodyParser.json({ extended: true }));
app.use(compression());


// add HANA client to all incoming requests. json file is only read when not running on XS Advanced Server
const services = xsenv.getServices({ hana: { tag: 'hana' } }, '/tmp/default-services.json');
app.use('/', hdbext.middleware(services.hana));

// stubbed by default
let security = (req, res, next) => {
  next();
};

// configure keycloak if enabled
if (process.env.KEYCLOAK == 'true') {
  console.log('Securing with keycloak');
  const memoryStore = new session.MemoryStore();
  const kcConfig = {
    resource: 'express',
    'bearer-only': true,
    'auth-server-url': process.env.KEYCLOAK_URL || 'http://localhost:8180/auth',
    realm: 'cp-sso'
  };
  let keycloak = new Keycloak({ store: memoryStore }, kcConfig);

  app.use(session({
    secret: 'keycloak-session-secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));

  app.use(keycloak.middleware());

  security = keycloak.protect();
}

require('./router')(app, security);

http.createServer(app)
  .listen(app.get('port'), () => {
    console.info(`http server started on port ${app.get('port')}`);
  });