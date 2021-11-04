const {app, knex} = require('../app');
const request = require('supertest');
const { response } = require('express');

describe('test suite description', () => {
  
  beforeAll(() => {
    return knex.migrate.latest();
  });

  beforeAll(() => {
    return knex.seed.run();
  });

  afterAll(() => {
    return knex.migrate
      .rollback()
      .then(() => knex.destroy());
  });

  test('GOT/characters routes should work', async () => {
    
    const result = await request(app)
      .get('/GOT/characters')
      .expect(200)

    expect(typeof result).toEqual('object');
  });

  it('/GOT/houses route should work', async () => {
    const response = await request(app)
      .get('/GOT/houses')
      .expect(200)

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('houses');
    expect(response.body[0]['houses']).toHaveLength(23);
  }); 

  it('/GOT/orders route should work', async () => {
    const response = await request(app)
      .get('/GOT/orders')
      .expect(200)

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty('orders')
    expect(response.body[0]['orders'][0]['name']).toContain('Night\'s Watch');
  })

  it('/GOT/tree/index should work', async () => {
    const response = await request(app)
      .get('/GOT/tree/16')
      .expect(200);

    expect(typeof response).toEqual('object');
    expect(response.body['charName']).toBe('Arya Stark');
    expect(response.body['childTree']).toHaveLength(4);
  })
  
});



// it('/GOT/characters/:', async () => {
//   const response = await request(app).get('/books');

//   const expected = (response.body[0].id);
//   expect(expected).toEqual(1);
// });


// it('GETs the expected data from books/1 endpoint', async () => {
//   const result= await request(app).get('/books/1');

//   const expectedBookTitle = (result.body.title);
//   expect(expectedBookTitle).toEqual("Hyperion");
// });

// it('GETs the expected data from books/100 endpoint', async () => {
//   const result = await request(app)
//   .get('/books/100')
//     .expect(404);
// });