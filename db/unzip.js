'use strict';

const AdmZip = require('adm-zip');

const path = './src/data';
const zipFile = `./event.zip`;

console.info(`Extracting ${zipFile} to ${path}`);
const zip = new AdmZip(zipFile);
zip.extractAllTo(path, true);