'use strict';

const event = require('./controllers/event');
const map = require('./controllers/map');
const search = require('./controllers/search');
const status = require('./controllers/status');

module.exports = ((app) => {
  const keycloak = require('./middlewares/keycloak')(app);

  app.use('/status', keycloak, status);
  app.use('/event', keycloak, event);
  app.use('/map',keycloak, map);
  app.use('/search', keycloak, search);
});