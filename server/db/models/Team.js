const Sequelize = require('sequelize');
const { STRING, INTEGER } = require('sequelize');
const db = require('../db');

const Team = db.define('team', {
  name: STRING,
  score: {
    type: INTEGER,
    default: 0,
  },
});

module.exports = Team;
