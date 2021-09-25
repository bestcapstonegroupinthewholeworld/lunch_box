const router = require('express').Router();
// const {
//   models: { User, Party, Lunchbox, Game, Card, Team },
// } = require('../db');

const User = require('../db/models/User');
const Party = require('../db/models/Party');
const Lunchbox = require('../db/models/Lunchbox');
const Game = require('../db/models/Game');
const Card = require('../db/models/Card');
const Team = require('../db/models/Team');

module.exports = router;

//CREATE A PARTY AND ADD HOST
router.post('/host', async (req, res, next) => {
  try {
    const party = await Party.create();
    const host = await User.findByPk(req.body.hostId);
    await host.update({ partyId: party.id, host: party.id });
    await party.chooseGame('lunchbox');
    res.json(party);
  } catch (err) {
    next(err);
  }
});

//GET PARTY INFO

router.get('/:id', async (req, res, next) => {
  const party = await Party.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Game,
        include: { model: Lunchbox, include: { model: Card } },
      },
      {
        model: Team,
        include: { model: User },
      },
    ],
  });

  res.json(party);
});

//MAKE TEAMS

router.post('/teams/:id', async (req, res, next) => {
  try {
    const party = await Party.findByPk(req.params.id);
    await party.makeRandomTeams();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

//JOIN A PARTY ROUTE

//GET PARTY GAME STATE ROUTE
