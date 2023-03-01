const mysqlConnection = require('../utils/database');

const supertest = require('supertest');
const createServer = require('../utils/server');

const app = createServer();

afterAll(async () =>{
  await mysqlConnection.end();
  await console.log('mySQL Database has been disconnected!');
})

describe('events',()=>{
  describe('get events/:id route', ()=>{
    describe('given the event does not exist',()=>{
      it('should return a 404', async ()=>{
        const eventId = 'event-123';
        await supertest(app).get(`/events/${eventId}`).expect(404)
      })
    });
  })
});

describe('riders',()=>{
  describe('get riders/:id route', ()=>{
    describe('given the rider does not exist',()=>{
      it('should return a 404', async ()=>{
        const riderId = 'rider-123';
        await supertest(app).get(`/riders/${riderId}`).expect(404)
      })
    });
  })
});

describe('venues',()=>{
  describe('get venues/:id route', ()=>{
    describe('given the venue does not exist',()=>{
      it('should return a 404', async ()=>{
        const eventId = 'event-123';
        await supertest(app).get(`/venues/${eventId}`).expect(404)
      })
    });
  })
});

