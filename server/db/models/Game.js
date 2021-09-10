const Sequelize = require('sequelize');
const { STRING, INTEGER } = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  name: STRING,
  Rounds: INTEGER,
  RoundTime: {
    type: INTEGER,
    default: 60,
    //store time in seconds seems easiest
  },
  Round1Rules: STRING,
  Round2Rules: STRING,
  Round3Rules: STRING,
  Round4Rules: STRING,
  Round5Rules: STRING,
});

module.exports = Game;
