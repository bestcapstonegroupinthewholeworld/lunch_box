const Sequelize = require('sequelize');
const { STRING, BOOLEAN, INTEGER, ENUM } = require('sequelize');
const db = require('../db');

const Card = db.define('card', {
  name: STRING,
  status: {
    type: ENUM('current', 'skipped', 'pending', 'guessed'),
    defaultValue: 'pending',
  },
  createdBy: INTEGER,

  //this would be for pictionary or something. just adding the field to look ahead. won't be used for lunchbox games
  Category: STRING,
});

module.exports = Card;
