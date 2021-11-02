const app = require('../app');
const request = require('supertest');
const characters = require('../mock_data/books.json');
const houses = require('../mock_data/books.json');
const kill = require('../mock_data/books.json');
const orders = require('../mock_data/books.json');
const relationships = require('../mock_data/books.json');
const siblings = require('../mock_data/books.json');

//describe('the /books path', () => {
  //it('returns all books resources to GET request senders', (done) => {

    
     //write a test for a request handler for GET methods at `/books`
 //});

//});

test('GET /books', async () => {
  const result = await request(app)
    .get('/books')
    .expect(200);

  expect(result.body.length).toEqual(4);
});

it('GETs the expected data from books endpoint', async () => {
  const response = await request(app).get('/books');

  const expected = (response.body[0].id);
  expect(expected).toEqual(1);
});


it('GETs the expected data from books/1 endpoint', async () => {
  const result= await request(app).get('/books/1');

  const expectedBookTitle = (result.body.title);
  expect(expectedBookTitle).toEqual("Hyperion");
});

it('GETs the expected data from books/100 endpoint', async () => {
  const result = await request(app)
  .get('/books/100')
    .expect(404);
});