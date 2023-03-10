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


describe('\nEvent Routes:', ()=>{

  describe('get events/ route:', ()=>{
    describe('given the route directs to /events', ()=>{
     it('should return a 200 status and a list of the events.', async()=>{
        const res = await supertest(app).get(`/events`)
        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe('get events/:id route', ()=>{
    describe('given the event does not exist', ()=>{
      it('should return a 404', async ()=>{
        const eventId = 'event-123';
        await supertest(app).get(`/events/${eventId}`).expect(404)
      })
    });

    describe('given the event does exist',()=>{
      it('should return a 200 status and the event.', async ()=>{
        const eventId = 1;
        const response = await supertest(app)
          .get(`/events/${eventId}`)
          expect(response.statusCode).toBe(200)
      })
    });
  });
});

