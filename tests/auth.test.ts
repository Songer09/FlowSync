// tests/auth.test.ts
import request from 'supertest';
import { App } from '../src/app';
import User from '../src/models/User';
import dotenv from 'dotenv';
dotenv.config({ path: './tests/.env.test' });

const app = new App().getApp();

beforeEach(async () => {
  await User.destroy({ where: {} });
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('test@example.com');
  });

  it('should not allow duplicate email', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
      });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser2',
        email: 'test@example.com',
        password: '123456',
      });

    expect(res.statusCode).toBe(409);
  });

  it('should login successfully', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: '123456',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
  });
});