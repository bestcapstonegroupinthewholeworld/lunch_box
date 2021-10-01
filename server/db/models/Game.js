const Sequelize = require('sequelize');
const { STRING, INTEGER, TEXT } = require('sequelize');
const db = require('../db');

const Game = db.define('game', {
  name: STRING,
  rounds: {
    type: INTEGER,
    defaultValue: 3,
  },

  roundTime: {
    type: INTEGER,
    defaultValue: 60,
  },
  cardsPerPlayer: {
    type: INTEGER,
    defaultValue: 10,
  },
  round1Rules: TEXT,
  round2Rules: TEXT,
  round3Rules: TEXT,
  round4Rules: TEXT,
  round5Rules: TEXT,
});

module.exports = Game;
