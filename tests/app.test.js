const {app, knex} = require('../app');
const request = require('supertest');

// const characters = require('mock_data/characters_mock_data.json');
// const houses = require('mock_data/houses_mock_data.json');
// const kill = require('mock_data/kill_mock_data.json');
// const orders = require('mock_data/orders_mock_data.json');
// const relationships = require('mock_data/relationship_mock_data.json');
// const siblings = require('mock_data/siblings_mock_data.json');
// const parents = require('mock_data/parents_mock_data.json');

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

  it('/GOT/houses', async () => {
    const response = await request(app)
      .get('/GOT/houses')
      .expect(200)

    expect(typeof response).toEqual('object');

  }); 
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