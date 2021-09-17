const Sequelize = require('sequelize');
const { STRING, INTEGER, TEXT } = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  name: STRING,
  rounds: INTEGER,
  roundTime: {
    type: INTEGER,
    default: 60,
    //store time in seconds seems easiest
  },
  round1Rules: TEXT,
  round2Rules: TEXT,
  round3Rules: TEXT,
  round4Rules: TEXT,
  round5Rules: TEXT,
});

module.exports = Game;
