'use strict';

const fs = require('fs');
const csvFile = './src/data/event.csv';

console.info(`Deleting ${csvFile}`);
fs.unlinkSync(csvFile);