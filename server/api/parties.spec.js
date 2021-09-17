const { expect } = require('chai');
const request = require('supertest');
const {
  db,
  models: { User, Party },
} = require('../db');
const seed = require('../../script/seed');
const app = require('../app');
const Lunchbox = require('../db/models/Lunchbox');

describe('Party routes', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('/api/parties/', () => {
    it('creates a new party', async () => {
      const res = await request(app).post(`/api/parties/1`).expect(200);
      expect(res.body).to.be.an('object');
    });

    it('adds the host to the party', async () => {
      const res = await request(app).post(`/api/parties/1`);
      const host = await User.findByPk(1);
      expect(host.partyId).to.equal(res.body.id);
    });
  }); // end describe('/api/parties')

  describe('chooseGame', () => {
    it('creates a new game instance', async () => {
      const res = await request(app).post(`/api/parties/1`);
      const party = await Party.findByPk(res.body.id);
      const game = await party.chooseGame('lunchbox');
      expect(game.name).to.equal('Lunchbox');
    });
    it('it assigns the game to the party', async () => {
      const res = await request(app).post(`/api/parties/1`);
      const party = await Party.findByPk(res.body.id);
      const game = await party.chooseGame('lunchbox');
      expect(game.partyId).to.equal(game.id);
    });
    it('creates and assigns a lunchbox to the game', async () => {
      const res = await request(app).post(`/api/parties/1`);
      const party = await Party.findByPk(res.body.id);
      const game = await party.chooseGame('lunchbox');
      const lunchbox = await Lunchbox.findOne({ where: { gameId: game.id } });
      expect(lunchbox.gameId).to.equal(game.id);
    });
  }); // end describe('chooseGame')
}); // end describe('Party routes')
