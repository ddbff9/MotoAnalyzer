import sequelize from "../models";

const supertest = require('supertest');
const createServer = require('../utils/server');

// beforeEach(()=>{
//   jest.useFakeTimers();
// });

const app = createServer();

describe('events',()=>{
  describe('get events/:id route', ()=>{
    describe('given the event does not exist',()=>{
      it('should return a 404', async ()=>{
        const eventId = 'event-123';
        await supertest(app).get(`/events/${eventId}`).expect(404)
      })
    });

    describe('given the event does exist',()=>{
      it('should return a 200 status and the event.', async ()=>{
        const eventId = 1;
        const {body, statusCode} = await supertest(app)
          .get(`/events/${eventId}`)
          expect(statusCode).toBe(200)
          console.log('body:', body[0])
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
        const eventId = 'venue-123';
        await supertest(app).get(`/venues/${eventId}`).expect(404)
      })
    });
  })
});

