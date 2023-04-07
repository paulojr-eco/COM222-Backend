import { type Request, type Response } from 'express';
import { type Controller } from '../../core/application/controller';
import { HttpRequest } from '../../core/helpers/http';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
