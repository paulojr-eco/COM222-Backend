import { ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpResponse } from '@core/helpers/http';
import { GetEmployees } from '@domain/use-cases/employee';

export class GetEmployeesController implements Controller {
  constructor(private readonly getEmployees: GetEmployees) {}

  async handle(): Promise<HttpResponse> {
    try {
      const employees = await this.getEmployees.execute();
      return ok(employees);
    } catch (err) {
      return serverError();
    }
  }
}
