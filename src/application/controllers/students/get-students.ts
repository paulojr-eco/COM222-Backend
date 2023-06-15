import { ok, serverError } from '@application/helpers/http-helper';
import { Controller } from '@core/application/controller';
import { HttpResponse } from '@core/helpers/http';
import { GetStudents } from '@domain/use-cases/student';

export class GetStudentsController implements Controller {
  constructor(private readonly getStudents: GetStudents) {}

  async handle(): Promise<HttpResponse> {
    try {
      const students = await this.getStudents.execute();
      return ok(students);
    } catch (err) {
      return serverError();
    }
  }
}
