const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return 200 OK status code', () => {
      return request(server)
        .get("/")
        .expect(200)
    })

    it('should return JSON format response', () => {
      
    })

    it('should return a welcome message', () => {
      
    })
  })

  describe('POST /api/games', () => {
    const pacman =   {
      title: 'Pacman', // required
      genre: 'Arcade', // required
      releaseYear: 1980 // not required
    }
    
    it('should return 201 OK status code with all data', () => {
      return request(server)
      .post("/api/games")
      .send(pacman)
      .expect(201)
    });

    it('should return 201 OK status even with missing year', () => {
      return request(server)
      .post("/api/games")
      .send({...pacman, releaseYear: null})
      .expect(201)
    });

    it('should return 422 status code if title is blank', () => {
      return request(server)
      .post("/api/games")
      .send({...pacman, title: ""})
      .expect(422)
    });

    it('should return 422 status code if genre is blank', () => {
      return request(server)
      .post("/api/games")
      .send({...pacman, genre: ""})
      .expect(422)
    });

    it('should return error message if required fields are blank', () => {
      
    });

    it('should return JSON format response', () => {
      
    })

    it('should return created game', () => {
      
    })
  })

  describe('GET /api/games', () => {
    it('should return 200 OK status code', () => {
      return request(server)
      .get("/api/games")
      .expect(200)
    });

    it('should return JSON format response', () => {
      
    })

    it('should return an empty array if there are no games to return', () => {
      
    })

    it('should return an array of all games', () => {
      
    })
  })
})