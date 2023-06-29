const Datastore = require('nedb');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'data.db');
const db = new Datastore({ filename: dbPath, autoload: true });

module.exports = db;