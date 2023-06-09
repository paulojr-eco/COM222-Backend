import { MissingParamError } from '@application/errors';
import { badRequest, ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpRequest, HttpResponse } from '@core/helpers/http';
import { GetEmployeeById } from '@domain/use-cases/employee';

export class GetEmployeeByIdController implements Controller {
  constructor(private readonly getsGetEmployeeById: GetEmployeeById) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      const employee = await this.getsGetEmployeeById.execute(id);
      return ok(employee);
    } catch (err) {
      return serverError();
    }
  }
}
