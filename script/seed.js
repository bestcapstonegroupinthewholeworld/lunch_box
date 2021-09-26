'use strict';

const {
  db,
  models: { User, Party, Game, Lunchbox, Card },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  //   const lunchbox = db.models.lunchbox.create();
  //   await Promise.all([
  //     db.models.card.create({ name: 'Elvis', lunchboxId: lunchbox.id }),
  //     db.models.card.create({ name: 'Bible', lunchboxId: lunchbox.id }),
  //   ]);

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
    // User.create({ username: 'a', password: '123' }),
    // User.create({ username: 'b', password: '123' }),
    // User.create({ username: 'c', password: '123' }),
    // User.create({ username: 'd', password: '123' }),
    // User.create({ username: 'e', password: '123' }),
    // User.create({ username: 'f', password: '123' }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
