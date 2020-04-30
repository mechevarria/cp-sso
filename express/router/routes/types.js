'use strict';

const express = require('express');
const hdbext = require('@sap/hdbext');
const router = express.Router();

router.get('/', function (req, res) {
  const typesQuery = `
	SELECT DISTINCT TA_TYPE as "taType"
	FROM "$TA_EVENT.fti_notes";
  `;
  
  hdbext.createConnection(req.dbConfig, (err, client) => {
    if (err) {
      res.status(500).json({ error: `[types]: ${err.message}` });
    }
    const results = [];
    client.exec(typesQuery).forEach(result => {
      results.push(result.taType);
    });
    res.json(results);
  });
});

module.exports = router;