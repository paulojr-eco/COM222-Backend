import { Controller } from '../../core/application/controller';
import { HttpRequest, HttpResponse } from '../../core/helpers/http';
import { CreateStudent } from '../../domain/use-cases/student';
import { MissingParamError } from '../errors';
import { badRequest, created, serverError } from '../helpers/http-helper';

export class CreateStudentController implements Controller {
  constructor(private readonly createStudent: CreateStudent) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields: string[] = ['nome', 'email'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const { email, nome } = httpRequest.body;
      await this.createStudent.execute({ email, nome });
      return created();
    } catch (err) {
      return serverError();
    }
  }
}
