const Sequelize = require('sequelize');
const db = require('../db');

const Party = db.define('party', {
  password: {
    type: Sequelize.STRING,
  },
});

module.exports = Party;
