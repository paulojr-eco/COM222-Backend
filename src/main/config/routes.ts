import { Router, type Express } from 'express';
import students from '../routes/students.routes';

export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use('/api', router);
  students(router);
};
