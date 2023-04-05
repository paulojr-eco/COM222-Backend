import request from 'supertest';
import { describe, test } from 'vitest';
import app from '../config/app';

describe('Students Routes', () => {
  test('should return 200 on success', async () => {
    await request(app)
      .post('/api/alunos')
      .send({
        name: 'John',
        email: 'john@example.com',
      })
      .expect(200);
  });
});
