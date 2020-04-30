const http = require('http');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cfenv = require('cfenv');

let app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined'));
app.use(bodyParser.json({ extended: true }));
app.use(compression());

app.use('/', (req, res, next) => {
  const appEnv = cfenv.getAppEnv();
  const services = appEnv.getServices();
  console.log(services);
  //const vcap_services = JSON.parse(process.env.VCAP_SERVICES)
  //host: vcap_services.hdi_hana[0].credentials.host,
  let dbConfig = {
    host: process.env.VCAP_SERVICES_HDI_HANA_CREDENTIALS_HOST,
    port: process.env.VCAP_SERVICES_HDI_HANA_CREDENTIALS_PORT,
    user: process.env.VCAP_SERVICES_HDI_HANA_CREDENTIALS_USER,
    password: process.env.VCAP_SERVICES_HDI_HANA_CREDENTIALS_PASSWORD,
    encrypt: true,
    sslValidateCertificate: false,
    currentSchema: 'HANA'
  };

  req.dbConfig = dbConfig;
  next();
});

// pass configured express server to routes
require('./router')(app);

http.createServer(app)
  .listen(app.get('port'), () => {
    console.info(`http server started on port ${app.get('port')}`);
  });