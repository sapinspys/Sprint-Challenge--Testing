const express = require('express');

const games = require('../games/games-model.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ message: "Welcome to Lambda Testing Sprint Challenge 2019" });
});

server.post('/api/games', async (req, res) => {
  const savedGames = await games.getAll();

  res.status(200).json(savedGames);
});

server.get('/api/games', async (req, res) => {
  const gameInfo = req.body;
  const newGame = await games.insert(gameInfo);

  res.status(200).json(newGame);
});

module.exports = server;
