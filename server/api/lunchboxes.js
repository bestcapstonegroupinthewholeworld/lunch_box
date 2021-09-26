const router = require('express').Router();
const {
  models: { Party, Lunchbox },
} = require('../db');

const Team = require('../db/models/Team');
const User = require('../db/models/User');
const Card = require('../db/models/Card');

module.exports = router;

router.get('/:id', async (req, res, next) => {
  try {
    const cards = await Card.findAll({
      where: { lunchboxId: req.params.id },
    });

    res.json(cards);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const card = await Card.create(req.body);
    res.json(card);
  } catch (error) {
    next(error);
  }
});

router.post('/pick/:id', async (req, res, next) => {
  try {
    const card = await Card.findByPk(req.params.id * 1);
    await card.update({ status: 'current' });
    res.json(card);
  } catch (error) {
    next(error);
  }
});

router.post('/guess/:id/:userId', async (req, res, next) => {
  try {
    const card = await Card.findByPk(req.params.id * 1);
    await card.update({ status: 'guessed' });

    const user = await User.findByPk(req.params.userId * 1);
    const team = await Team.findByPk(user.teamId);
    await team.update({ score: team.score + 1 });
    res.json(card);
  } catch (error) {
    next(error);
  }
});

router.post('/skip/:id', async (req, res, next) => {
  try {
    const card = await Card.findByPk(req.params.id * 1);
    await card.update({ status: 'skipped' });
    res.json(card);
  } catch (error) {
    next(error);
  }
});
