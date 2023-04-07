import { Controller } from '../../core/application/controller';
import { HttpRequest, HttpResponse } from '../../core/helpers/http';
import { DeleteStudent } from '../../domain/use-cases/student';
import { MissingParamError } from '../errors';
import { badRequest, ok, serverError } from '../helpers/http-helper';

export class DeleteStudentController implements Controller {
  constructor(private readonly deleteStudent: DeleteStudent) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      if (!id) {
        return badRequest(new MissingParamError('id'));
      }
      await this.deleteStudent.execute(id);
      return ok();
    } catch (err) {
      return serverError();
    }
  }
}
