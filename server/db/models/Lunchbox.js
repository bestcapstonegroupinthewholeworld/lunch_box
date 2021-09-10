const Sequelize = require('sequelize');
const db = require('../db');

const Lunchbox = db.define('lunchbox', {});

module.exports = Lunchbox;
