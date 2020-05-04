'use strict';

const event = require('./routes/event');
const map = require('./routes/map');
const search = require('./routes/search');
const status = require('./routes/status');

module.exports = ((app) => {
  const keycloak = require('./keycloak-middleware')(app);

  app.use('/status', keycloak, status);
  app.use('/event', keycloak, event);
  app.use('/map',keycloak, map);
  app.use('/search', keycloak, search);
});