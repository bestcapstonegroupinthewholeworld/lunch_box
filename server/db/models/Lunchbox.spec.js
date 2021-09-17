/* global describe beforeEach it */

const { expect } = require('chai');
const {
  db,
  models: { User, Lunchbox, Party, Card },
} = require('../index');
const seed = require('../../../script/seed');

describe('Lunchbox Model', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('instanceMethods', () => {
    describe('addCard', () => {
      it('creates a card with the given name', async () => {
        const lunchbox = await db.models.lunchbox.create();
        const card = await lunchbox.addCard('Elvis');

        expect(card.name).to.equal('Elvis');
      });
      it('adds the card to the right lunchbox', async () => {
        const lunchbox = await db.models.lunchbox.create();
        const card = await lunchbox.addCard('Elvis');

        expect(card.lunchboxId).to.equal(lunchbox.id);
      });
    }); //end describe('addCard)

    describe('newRound', () => {
      it('changes the guessed status of all cards to false', async () => {
        const lunchbox = await db.models.lunchbox.create();
        await Promise.all([
          lunchbox.addCard('Elvis'),
          lunchbox.addCard('The Bible'),
        ]);

        let cards = await db.models.card.findAll({
          where: { lunchboxId: lunchbox.id },
        });
        cards.forEach(async (card) => {
          console.log(card.guessed);
          await card.update({ guessed: true });
          console.log(card.guessed);
        });
        expect(cards[0].guessed).to.equal(true);
        await lunchbox.newRound();
        cards = await db.models.card.findAll({
          where: { lunchboxId: lunchbox.id },
        });
        cards.forEach((card) => console.log(card.guessed));
        expect(cards[0].guessed).to.equal(false);
      });
    });
  }); // end describe('instanceMethods')
}); // end describe('Lunchbox model')
