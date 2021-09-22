const Sequelize = require('sequelize');
const { STRING, BOOLEAN, INTEGER } = require('sequelize');
const db = require('../db');

const Card = db.define('card', {
  name: STRING,
  guessed: {
    type: BOOLEAN,
    defaultValue: false,
  },
  createdBy: INTEGER,

  //this would be for pictionary or something. just adding the field to look ahead. won't be used for lunchbox games
  Category: STRING,
});

module.exports = Card;
