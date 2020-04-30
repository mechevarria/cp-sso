const http = require('http');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const xsenv = require('@sap/xsenv');
const hdbext = require('@sap/hdbext');

let app = express();

app.set('port', process.env.PORT || 3000);
app.use(morgan('combined'));
app.use(bodyParser.json({ extended: true }));
app.use(compression());


// add HANA client to all incoming requests. json file is only read when not running on XS Advanced Server
const services = xsenv.getServices({ hana: { tag: 'hana' } }, '/tmp/default-services.json');
app.use('/', hdbext.middleware(services.hana));

// pass configured express server to routes
require('./router')(app);

http.createServer(app)
  .listen(app.get('port'), () => {
    console.info(`http server started on port ${app.get('port')}`);
  });