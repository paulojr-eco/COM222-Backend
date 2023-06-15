import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import {
  makeCreateStudentController,
  makeDeleteStudentController,
  makeGetStudentByIdController,
  makeGetStudentsController,
  makeUpdateStudentController,
} from '@main/factories/student';

export default (router: Router): void => {
  router.post('/alunos', expressAdapterRoute(makeCreateStudentController()));
  router.get('/alunos', expressAdapterRoute(makeGetStudentsController()));
  router.get(
    '/alunos/:id',
    expressAdapterRoute(makeGetStudentByIdController())
  );
  router.put('/alunos/:id', expressAdapterRoute(makeUpdateStudentController()));
  router.delete(
    '/alunos/:id',
    expressAdapterRoute(makeDeleteStudentController())
  );
};
