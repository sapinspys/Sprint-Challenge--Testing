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

  if (gameInfo.title && gameInfo.genre) {
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

module.exports = server;
