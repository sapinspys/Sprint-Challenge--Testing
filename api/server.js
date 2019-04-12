const express = require("express");

const games = require("../games/games-model.js");

const server = express();

server.use(express.json());

server.get("/", async (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Testing Sprint Challenge - Lambda 2019" });
});

server.post("/api/games", async (req, res) => {
  const gameInfo = req.body;
  const savedGames = await games.getAll();
  const titles = savedGames.map(obj => obj.title);

  if (titles.includes(gameInfo.title)) {
    res.status(405).json({ error: "Game title already exists" });
  } else if (gameInfo.title && gameInfo.genre) {
    const newGame = await games.insert(gameInfo);

    res.status(201).json(newGame);
  } else {
    res.status(422).json({ error: "Game title and genre are required fields" });
  }
});

server.get("/api/games", async (req, res) => {
  const savedGames = await games.getAll();

  res.status(200).json(savedGames);
});

server.get("/api/games/:id", async (req, res) => {
  const game = await games.getById(req.params.id);

  if (game) {
    res.status(200).json(game);
  } else {
    res.status(404).json({ error: "Game not found" });
  }
});

module.exports = server;
