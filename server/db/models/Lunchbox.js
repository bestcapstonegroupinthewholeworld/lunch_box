const Sequelize = require('sequelize');
const db = require('../db');

const Lunchbox = db.define('lunchbox', {});

module.exports = Lunchbox;

/**
 * instanceMethods
 */

Lunchbox.prototype.addCard = async function (name) {
  const card = await db.models.card.create({ name, lunchboxId: this.id });
  return card;
};

Lunchbox.prototype.newRound = async function () {
  const cards = await db.models.card.findAll({
    where: { lunchboxId: this.id },
  });
  cards.forEach(async (cad) => {
    console.log(cad);
  });
};
