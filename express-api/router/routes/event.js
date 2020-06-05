'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const eventQuery = `
	SELECT 
	  EVENT_ID AS "eventId",
	  EVENT_DATE AS "eventDate",
	  EVENT_TYPE AS "eventType",
	  SUB_EVENT_TYPE AS "subEventType",
	  ACTOR_1 AS "actor1",
	  ACTOR_2 AS "actor2",
	  ASSOC_ACTOR_1 AS assocActor1,
	  ASSOC_ACTOR_2 AS assocActor2,
	  COUNTRY_NAME AS "country",
	  LATITUDE AS "latitude",
	  LONGITUDE AS "longitude",
	  GEO_LOCATION.ST_AsGeoJSON() AS "geoLocation",
	  LOCATION AS "location",
	  NOTES AS "notes",
	  REGION AS "region",
	  SOURCE AS "source",
	  FATALITIES AS "fatalities",
	  TIMESTAMP AS "timestamp",
	  YEAR AS "year"
  FROM EVENT	
  LIMIT ?
  OFFSET ?
  `;
  const limit = req.query.limit || 10;
  const offset = req.query.offset || 0;

  const countQuery = `
	SELECT RECORD_COUNT as "recordCount"
	FROM   M_TABLES
	WHERE  TABLE_NAME = 'EVENT';  
  `;

  try {
    const count = req.db.exec(countQuery);
    const results = req.db.exec(eventQuery, [limit, offset]);

    results.forEach(result => {
      result.geoLocation = JSON.parse(result.geoLocation);
    });

    res.json({
      'results': results,
      'count': count[0].recordCount
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `[event]: ${err.message}` });
  }

});

module.exports = router;