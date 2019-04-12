const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  describe('GET /', () => {
    it('should return 200 OK status code', () => {

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
    
    it('should return 201 OK status code on sucess', () => {
      
    });

    it('should return 422 status code if required fields are blank', () => {
      
    });

    it('should return error message if required fields are blank', () => {
      
    });

    it('should return JSON format response', () => {
      
    })

    it('should return created game', () => {
      
    })

  describe('GET /api/games', () => {
    it('should return 200 OK status code', () => {
      
    });

    it('should return JSON format response', () => {
      
    })

    it('should return an array of all games', () => {
      
    })
  })
})