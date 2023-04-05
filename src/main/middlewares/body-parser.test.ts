import request from 'supertest';
import { describe, test } from 'vitest';

import app from '../config/app';

describe('Body Parser Middleware', () => {
  test('should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Flávio' })
      .expect({ name: 'Flávio' });
  });
});
