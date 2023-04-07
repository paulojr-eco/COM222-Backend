import { type Router } from 'express';
import { adaptRoute } from '../adapter/express-route-adapter';
import { makeCreateStudentController } from '../factories/student';

export default (router: Router): void => {
  router.post('/alunos', adaptRoute(makeCreateStudentController()));
};
