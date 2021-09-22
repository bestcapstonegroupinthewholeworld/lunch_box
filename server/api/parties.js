const router = require('express').Router();
const {
  models: { User, Party },
} = require('../db');

module.exports = router;

//CREATE A PARTY AND ADD HOST
router.post('/host', async (req, res, next) => {
  try {
    const party = await Party.create();
    const host = await User.findByPk(req.body.hostId);
    await host.update({ partyId: party.id, host: true });
    const { lunchbox, game } = await party.chooseGame('lunchbox');
    res.json({ party, lunchboxId: lunchbox.id, game });
  } catch (err) {
    next(err);
  }
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
