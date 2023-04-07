import { type Router } from 'express';
import { expressAdapterRoute } from '../adapter/express-route';
import {
  makeCreateStudentController,
  makeDeleteStudentController,
  makeGetStudentByIdController,
  makeGetStudentsController,
  makeUpdateStudentController,
} from '../factories/student';

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
