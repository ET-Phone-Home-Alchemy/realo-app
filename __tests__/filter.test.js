const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const agent = request.agent(app);

describe('realo-app-backend routes', () => {
  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/filter.sql', 'utf-8'));
    await pool.query(fs.readFileSync('./sql/auth.sql', 'utf-8'));

    await UserService.create({
      email: 'test@test.com',
      password: 'password',
      name: 'Jon Arbuckle',
      phoneNumber: '1235671234',
      carrier: 'att'
    });

    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password',
        name: 'Jon Arbuckle',
        phoneNumber: '1235671234',
        carrier: 'att'
      });
  });

  afterAll(() => {
    pool.end();
  });

  it('/POST add user filter', async() => {

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
      filterId: '1',
      userId: '1',
      filterName: 'My first filter!',
      squareFeetMin: '0',
      squareFeetMax: '10000',
      bedMin: '0',
      bedMax: '7',
      bathMin: '0',
      bathMax: '8',
      priceMin: '0',
      priceMax: '1000000'
    });
  });

});
