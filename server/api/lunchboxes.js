const router = require('express').Router();
const {
  models: { User, Party, Lunchbox },
} = require('../db');

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
