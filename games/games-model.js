const db = require('../data/dbConfig.js');

module.exports = {
  insert,
  getAll
};

async function insert(hobbit) {
  const [id] = await db('hobbits').insert(hobbit);

  return db('hobbits').where({id}).first();
}

function getAll() {
  return db('hobbits');
}