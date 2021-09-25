const Sequelize = require('sequelize');
const { STRING, INTEGER } = require('sequelize');
const db = require('../db');

const Team = db.define('team', {
  name: STRING,
  score: {
    type: INTEGER,
    defaultValue: 0,
  },
  clueGiver: {
    type: INTEGER,
    defaultValue: 1,
  },
});

module.exports = Team;
