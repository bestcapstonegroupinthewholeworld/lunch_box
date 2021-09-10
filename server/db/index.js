//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Party = require('./models/Party');
const Team = require('./models/Team');
const Game = require('./models/Game');
const Lunchbox = require('./models/Lunchbox');
const Card = require('./models/Card');

User.belongsTo(Party);
Party.hasMany(User);

User.belongsTo(Team);
Team.hasMany(User);

Party.hasOne(Game);
Game.belongsTo(Party);

Game.hasOne(Lunchbox);
Lunchbox.belongsTo(Game);

Card.belongsTo(Lunchbox);
Lunchbox.hasMany(Card);

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Party,
  },
};
