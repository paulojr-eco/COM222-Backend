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

  describe('POST /alunos', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .post('/api/alunos')
        .send({
          email: 'email@example.com',
        })
        .expect(400);
    });

    test('should return 201 on success', async () => {
      await request(app)
        .post('/api/alunos')
        .send({
          nome: 'nome',
          email: 'email@example.com',
        })
        .expect(201);
    });
  });

  describe('GET /alunos', () => {
    test('should return 200 on success', async () => {
      await request(app).get('/api/alunos').expect(200);
    });
  });

  describe('GET /alunos/:id', () => {
    test('should return 200 on success', async () => {
      await request(app).post('/api/alunos').send({
        nome: 'nome',
        email: 'email@example.com',
      });
      const student = await prisma.student.findFirst();
      await request(app)
        .put('/api/alunos/' + student?.id)
        .expect(200);
    });
  });

  describe('PUT /alunos/:id', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .put('/api/alunos/' + 'id')
        .send({
          nome: 'nome',
          email: 'email@example.com',
        })
        .expect(400 | 500);
    });

    test('should return 200 on success', async () => {
      await request(app).post('/api/alunos').send({
        nome: 'nome',
        email: 'email@example.com',
      });
      const student = await prisma.student.findFirst();
      await request(app)
        .put('/api/alunos/' + student?.id)
        .send({
          nome: 'nome',
          email: 'email@example.com',
        })
        .expect(200);
    });
  });

  describe('DELETE /alunos/:id', () => {
    test('should return 400 on failure', async () => {
      await request(app)
        .delete('/api/alunos/' + 'id')
        .expect(400 | 500);
    });

    test('should return 200 on success', async () => {
      await request(app).post('/api/alunos').send({
        nome: 'nome',
        email: 'email@example.com',
      });
      const student = await prisma.student.findFirst();
      await request(app)
        .delete('/api/alunos/' + student?.id)
        .expect(200);
    });
  });
});
