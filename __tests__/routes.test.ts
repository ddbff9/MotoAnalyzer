const supertest = require('supertest');
const {createServer} = require('../utils/server');

const app = createServer();

beforeAll(async()=>{
  await app;
});

afterAll(async()=>{
  let server = await app.listen(3000);
  server.close();
});

describe('\nRider Routes:',()=>{
  describe('get riders/:id route', ()=>{
    describe('given the rider does not exist', ()=>{
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

