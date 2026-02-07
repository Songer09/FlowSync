// tests/workflow.test.ts
import request from 'supertest';
import { App } from '../src/app';
import User from '../src/models/User';
import Workflow from '../src/models/Workflow';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config({ path: './tests/.env.test' });

const app = new App().getApp();

beforeEach(async () => {
  await User.destroy({ where: {} });
  await Workflow.destroy({ where: {} });
});

describe('Workflow Endpoints', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: '123456',
    });
    userId = user.id;
    token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);
  });

  it('should create a workflow', async () => {
    const res = await request(app)
      .post('/api/workflows')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Flujo #1', description: 'Test' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Flujo #1');
  });

  it('should list user workflows', async () => {
    const res = await request(app)
      .get('/api/workflows')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(1);
  });

  it('should not access another user workflow', async () => {
    const otherUser = await User.create({
      username: 'other',
      email: 'other@example.com',
      password: '123456',
    });
    const otherWorkflow = await Workflow.create({
      user_id: otherUser.id,
      name: 'Flujo de otro',
    });

    const res = await request(app)
      .get(`/api/workflows/${otherWorkflow.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });
});