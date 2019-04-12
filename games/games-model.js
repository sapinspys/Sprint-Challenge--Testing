const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  getAll,
  findById,
};

async function insert(hobbit) {
  const [id] = await db("games").insert(hobbit);

  return findById(id);
}

function getAll() {
  return db('games')
}

function findById(id) {
  return db("games")
    .where({ id })
    .first();
}
