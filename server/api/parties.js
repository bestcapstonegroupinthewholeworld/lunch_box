const router = require('express').Router();
const {
  models: { User, Party },
} = require('../db');

module.exports = router;

//CREATE A PARTY AND ADD HOST
router.post('/host', async (req, res, next) => {
  try {
    const newParty = await Party.create();
    const host = await User.findByPk(req.body.hostId);
    await host.update({ partyId: newParty.id });
    res.json(newParty);
  } catch (err) {
    next(err);
  }
});

//JOIN A PARTY ROUTE

//GET PARTY GAME STATE ROUTE
