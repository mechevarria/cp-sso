'use strict';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    const name = req.query.name || 'Guest';
    res.json({ message: `Greetings ${name} from the nodes.js Express server` });
});

module.exports = router;