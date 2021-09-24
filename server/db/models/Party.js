const Sequelize = require('sequelize');
const { UUID, UUIDV4, INTEGER } = Sequelize;
const db = require('../db');

const Party = db.define('party', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4(),
  },
  password: {
    type: Sequelize.STRING,
  },
  guessingTeam: INTEGER,
});

module.exports = Party;

/**
 * instanceMethods
 */

Party.prototype.chooseGame = async function (gameName) {
  //create a game instance and assign default rules
  let gameRules = {};
  switch (gameName) {
    case 'lunchbox':
      gameRules = {
        name: 'Lunchbox',
        rounds: 3,
        roundTime: 60,
        cardsPerPlayer: 10,
        partyId: this.id,
        round1Rules: `In the first round, the clue-giver has few restrictions. The person can say anything, as long as it's not part of the name or a direct reference to the name.
                                Example: For Aaron Rodgers, you can say, "He's the quarterback of the Green Bay Packers." You cannot say, "He's the football player known as A-Rod." It is also illegal to give clues such as, "His name begins with 'A'."`,
        round2Rules:
          'The clue-giver is limited to only one word (which can be repeated). Gestures are also permitted, as are sound effects.',
        round3Rules:
          'The clue-giver now cannot speak at all. Only gestures and sound effects are permitted.',
      };
      break;

    default:
      break;
  }
  const game = await db.models.game.create(gameRules);
  const lunchbox = await db.models.lunchbox.create({ gameId: game.id });

  return { lunchbox, game };
};

Party.prototype.makeRandomTeams = async function () {
  const users = await db.models.user.findAll({ where: { partyId: this.id } });
  const team1 = await db.models.team.create({ partyId: this.id });
  const team2 = await db.models.team.create({ partyId: this.id });

  this.guessingTeam = team1.id;
  this.save();

  const teamSize = users / 2;

  const team1users = [];

  for (let i = 0; i < teamSize; i++) {
    const idx = Math.round(Math.random() * users.length);
    team1users.push(users[idx]);
    users.splice(idx, 1);
  }

  users.forEach(async (user, idx) => {
    user.teamId = team2.id;
    user.turnOrder = idx + 1;
    await user.save();
  });
  team1users.forEach(async (user, idx) => {
    users.teamId = team1.id;
    user.turnOrder = idx + 1;
    await user.save();
  });
};
