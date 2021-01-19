const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');


const agent = request.agent(app);
let user;

describe('realo-app-backend routes', () => {
  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/auth.sql', 'utf-8'));

    return user = await UserService.create({
      email: 'test1@test.com',
      password: 'password',
      name: 'Joan Arbuckle',
      phoneNumber: '1235679876',
      carrier: 'att'
    });
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


<<<<<<< HEAD
<<<<<<< HEAD
  it('lets a user login on /POST', async() => {
=======
  it('/POST lets a user login', async() => {
>>>>>>> 6d762453f1fe4f8c458dadda15d13607747376db
=======
  it('/POST lets a user login', async() => {
>>>>>>> 6d762453f1fe4f8c458dadda15d13607747376db

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

  it('/GET verify', async() => {

    const agent = request.agent(app);
    
    await agent
      .post('/api/v1/auth/login')
      .send({
        email: 'test1@test.com',
        password: 'password'
      });

    const res = await agent 
      .get('/api/v1/auth/verify');

    expect(res.body).toEqual({
      userId: user.userId,
      email: 'test1@test.com',
      name: 'Joan Arbuckle',
      phoneNumber: '1235679876',
      carrier: 'att'
    });
  });

});
