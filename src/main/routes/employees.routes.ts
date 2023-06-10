import { type Router } from 'express';

import { expressAdapterRoute } from '@main/adapter/express-route';
import {
  makeCreateEmployeeController,
  makeDeleteEmployeeController,
  makeGetEmployeeByIdController,
  makeGetEmployeesController,
  makeUpdateEmployeeController,
} from '@main/factories/employee';

export default (router: Router): void => {
  router.post(
    '/funcionarios',
    expressAdapterRoute(makeCreateEmployeeController())
  );
  router.get(
    '/funcionarios',
    expressAdapterRoute(makeGetEmployeesController())
  );
  router.get(
    '/funcionarios/:id',
    expressAdapterRoute(makeGetEmployeeByIdController())
  );
  router.put(
    '/funcionarios/:id',
    expressAdapterRoute(makeUpdateEmployeeController())
  );
  router.delete(
    '/funcionarios/:id',
    expressAdapterRoute(makeDeleteEmployeeController())
  );
};
