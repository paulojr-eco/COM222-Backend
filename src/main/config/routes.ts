import employees from '@main/routes/employees.routes';
import students from '@main/routes/students.routes';
import { Router, type Express } from 'express';

export default async (app: Express): Promise<void> => {
  const router = Router();
  app.use('/api', router);
  students(router);
  employees(router);
};
