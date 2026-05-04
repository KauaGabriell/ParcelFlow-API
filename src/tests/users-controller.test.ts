import request from 'supertest';
import { app } from '@/app';
import { prisma } from '@/database/prisma';

describe('UsersController', () => {
  const createdUserIds: string[] = [];
  const email = `testuser+${Date.now()}@gmail.com`;

  it('Should create a new user successfully', async () => {
    const response = await request(app).post('/users').send({
      name: 'Test User',
      email,
      password: 'password123',
    });

    createdUserIds.push(response.body.id);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Test User');
  });

  it('Should return 400 when email is invalid', async () => {
    const response = await request(app).post('/users').send({
      name: 'Invalid Email User',
      email: 'invalid-email',
      password: 'password123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('validation error');
  });
  afterAll(async () => {
    if (!createdUserIds.length) return;

    await prisma.user.deleteMany({
      where: { id: { in: createdUserIds } },
    });
  });
});

describe('SessionsController', () => {
  const createdUserIds: string[] = [];

  it('Should return 401 when trying to authenticate with unavailable email', async () => {
    const response = await request(app).post('/sessions').send({
      email: `unavailable+${Date.now()}@gmail.com`,
      password: 'password123',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid Credentials');
  });

  it('Should authenticate successfully', async () => {
    const email = `authuser+${Date.now()}@gmail.com`;
    const createUserResponse = await request(app).post('/users').send({
      name: 'Auth Test User',
      email,
      password: 'password123',
    });

    createdUserIds.push(createUserResponse.body.id);

    const response = await request(app).post('/sessions').send({
      email,
      password: 'password123',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe(email);
  });

  afterAll(async () => {
    if (!createdUserIds.length) return;

    await prisma.user.deleteMany({
      where: { id: { in: createdUserIds } },
    });
  });
});
