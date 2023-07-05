import { makeIs } from '@main/factories/role';
import { type NextFunction, type Request, type Response } from 'express';

export const is = (userRoles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { statusCode, body } = await makeIs(userRoles).handle(req);

    if (statusCode !== 200) {
      res.statusCode = statusCode;
      res.json(body);
      return;
    }

    next();
  };
};
