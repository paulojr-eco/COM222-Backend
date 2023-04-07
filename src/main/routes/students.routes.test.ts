import request from 'supertest';
import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest';
import app from '../config/app';
import prisma from '../config/prisma';

describe('Students Routes', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    await prisma.student.deleteMany();
  });

  afterAll(async () => {
    await prisma.student.deleteMany();
    await prisma.$disconnect();
  });

  test('should return 201 on success', async () => {
    await request(app)
      .post('/api/alunos')
      .send({
        nome: 'John',
        email: 'john@example.com',
      })
      .expect(201);
  });
});
