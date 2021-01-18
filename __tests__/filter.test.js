const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
//const UserService = require('../lib/services/UserService');

const agent = request.agent(app);

describe('realo-app-backend routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/filter.sql', 'utf-8'));
  });

  afterAll(() => {
    pool.end();
  });

  it('/POST add user filter', async() => {

    await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        name: 'Jon Arbuckle',
        phoneNumber: '1235671234',
        carrier: 'att'
      });

    const res = await agent
      .post('/api/v1/filter')
      .send({
        filterName: 'My first filter!',
        squareFeetMin: 0,
        squareFeetMax: 10000,
        bedMin: 0,
        bedMax: 7,
        bathMin: 0,
        bathMax: 8,
        priceMin: 0,
        priceMax: 1000000
      });

    expect(res.body).toEqual({
      filter_id: 1,
      user_id: 1,
      filterName: 'My first filter!',
      squareFeetMin: 0,
      squareFeetMax: 10000,
      bedMin: 0,
      bedMax: 7,
      bathMin: 0,
      bathMax: 8,
      priceMin: 0,
      priceMax: 1000000
    });
  });

});
