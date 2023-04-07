import { Controller } from '../../core/application/controller';
import { HttpRequest, HttpResponse } from '../../core/helpers/http';
import { UpdateStudent } from '../../domain/use-cases/student';
import { MissingParamError } from '../errors';
import { badRequest, ok, serverError } from '../helpers/http-helper';

export class UpdateStudentController implements Controller {
  constructor(private readonly updateStudent: UpdateStudent) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const data = httpRequest.body;
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      await this.updateStudent.execute(id, data);
      return ok();
    } catch (err) {
      return serverError();
    }
  }
}
