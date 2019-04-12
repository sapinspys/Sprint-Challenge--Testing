const db = require("../data/dbConfig.js");

module.exports = {
  insert,
  getAll,
  getById,
};

async function insert(hobbit) {
  const [id] = await db("games").insert(hobbit);

  return getById(id);
}

function getAll() {
  return db('games')
}

function getById(id) {
  return db("games")
    .where({ id })
    .first();
}
