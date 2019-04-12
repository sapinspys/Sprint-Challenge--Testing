const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  getAll
};

async function insert(hobbit) {
  const [id] = await db('games').insert(hobbit);

  return db('games').where({id}).first();
}

async function getAll() {
  const games = await db('games')
  return games
}