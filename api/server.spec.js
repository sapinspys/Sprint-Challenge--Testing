const request = require("supertest");
const server = require("./server.js");

const db = require("../data/dbConfig.js");

describe("server.js", () => {
  beforeEach(async () => {
    await db("games").truncate();
  });

  const pacman = {
    title: "Pacman",
    genre: "Arcade",
    releaseYear: 1980
  };

  const invaders = {
    title: "Space Invaders",
    genre: "Arcade",
    releaseYear: 1978
  };

  describe("GET /", () => {
    it("should return 200 OK status code on success", () => {
      return request(server)
        .get("/")
        .expect(200);
    });

    it("should return JSON format response on success", () => {
      return request(server)
        .get("/")
        .expect("Content-Type", /json/);
    });

    it("should return a welcome message", () => {
      return request(server)
        .get("/")
        .then(response => {
          expect(response.body).toEqual({
            message: "Welcome to Testing Sprint Challenge - Lambda 2019"
          });
        });
    });
  });

  describe("POST /api/games", () => {
    it("should return 201 OK status code on success", () => {
      return request(server)
        .post("/api/games")
        .send(pacman)
        .expect(201);
    });

    it("should return 201 OK status even with missing release year", () => {
      return request(server)
        .post("/api/games")
        .send({ ...pacman, releaseYear: null })
        .expect(201);
    });

    it("should return JSON format response on success", () => {
      return request(server)
        .post("/api/games")
        .send(pacman)
        .expect("Content-Type", /json/);
    });

    it("should return 422 status code if title is blank", () => {
      return request(server)
        .post("/api/games")
        .send({ ...pacman, title: "" })
        .expect(422);
    });

    it("should return 422 status code if genre is blank", () => {
      return request(server)
        .post("/api/games")
        .send({ ...pacman, genre: "" })
        .expect(422);
    });

    it("should return error message if title is blank", () => {
      return request(server)
        .post("/api/games")
        .send({ ...pacman, title: "" })
        .then(response => {
          expect(response.body).toEqual({
            error: "Game title and genre are required fields"
          });
        });
    });

    it("should return 405 status code if title already exists", async () => {
      await request(server)
        .post("/api/games")
        .send(pacman);

      return request(server)
        .post("/api/games")
        .send(pacman)
        .expect(405);
    });

    it("should return error message if title already exists", async () => {
      await request(server)
        .post("/api/games")
        .send(pacman);

      return request(server)
        .post("/api/games")
        .send(pacman)
        .then(response => {
          expect(response.body).toEqual({
            error: "Game title already exists"
          });
        });
    });

    it("should return created game on sucess", () => {
      return request(server)
        .post("/api/games")
        .send({ ...pacman })
        .then(response => {
          expect(response.body).toEqual({ ...pacman, id: 1 });
        });
    });
  });

  describe("GET /api/games", () => {
    it("should return 200 OK status code", () => {
      return request(server)
        .get("/api/games")
        .expect(200);
    });

    it("should return JSON format response on success", () => {
      return request(server)
        .get("/api/games")
        .expect("Content-Type", /json/);
    });

    it("should return an empty array if there are no games to return", () => {
      return request(server)
        .get("/api/games")
        .then(response => {
          expect(response.body).toEqual([]);
        });
    });

    it("should return an array of all games", async () => {
      await request(server)
        .post("/api/games")
        .send(pacman);

      await request(server)
        .post("/api/games")
        .send(invaders);

      return request(server)
        .get("/api/games")
        .then(response => {
          expect(response.body.length).toEqual(2);
        });
    });
  });

  describe('GET /api/games/:id', () => {
    it("should return 200 OK status code on success", async () => {
      await request(server)
        .post("/api/games")
        .send(pacman);

      return request(server)
        .get("/api/games/1")
        .expect(200);
    });

    it("should return JSON format response on success", async () => {
      await request(server)
        .post("/api/games")
        .send(pacman);

      return request(server)
        .get("/api/games/1")
        .expect("Content-Type", /json/);
    });

    it("should return 404 status code if no game is found", async () => {
      return request(server)
        .get("/api/games/1")
        .expect(404);
    });

    it("should return error message if no game is found", async () => {
      return request(server)
        .get("/api/games/1")
        .then(response => {
          expect(response.body).toEqual({ error: "Game not found" });
        });
    });

    it("should return information about a single game", async () => {
      await request(server)
        .post("/api/games")
        .send(pacman);

      return request(server)
        .get("/api/games/1")
        .then(response => {
          expect(response.body).toEqual({ ...pacman, id: 1 });
        });
    });
  });
});
