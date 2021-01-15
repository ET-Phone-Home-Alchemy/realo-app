const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');


const agent = request.agent(app);

describe('realo-app-backend routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/auth.sql', 'utf-8'));
  });

  afterAll(() => {
    pool.end();
  });

  it('/POST allowing user to sign up', async() => {
    const res = await agent
      .post('/api/v1/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
        name: 'Jon Arbuckle',
        phoneNumber: '1235671234',
        carrier: 'att'
      });

    expect(res.body).toEqual({
      userId: expect.any(String),
      email: 'test@test.com',
      name: 'Jon Arbuckle',
      phoneNumber: '1235671234',
      carrier: 'att'
    });
  });


  it('lets a user login on /POST', async() => {
    const user = await UserService.create({
      email: 'test1@test.com',
      password: 'password',
      name: 'Joan Arbuckle',
      phoneNumber: '1235679876',
      carrier: 'att' 
    }); 

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'test1@test.com',
        password: 'password'
      });

    expect(res.body).toEqual({
      userId: user.userId,
      email: 'test1@test.com',
      name: 'Joan Arbuckle',
      phoneNumber: '1235679876',
      carrier: 'att' 
    });
  });


});
