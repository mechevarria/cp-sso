const event = require('./routes/event');
const map = require('./routes/map');
const chart = require('./routes/chart');
const search = require('./routes/search');
const types = require('./routes/types');
const analysis = require('./routes/analysis');
const status = require('./routes/status');

module.exports = ((app, security) => {
  app.use('/status', security, status);
  app.use('/event', security, event);
  app.use('/map',security, map);
  app.use('/search', security, search);
  app.use('/chart', security, chart);
  app.use('/types', security, types);
  app.use('/analysis', security, analysis);
});