import { Controller } from '../../core/application/controller';
import { HttpRequest, HttpResponse } from '../../core/helpers/http';
import { CreateStudent } from '../use-cases/create-student';

export class CreateStudentController implements Controller {
  constructor(private readonly createStudent: CreateStudent) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields: string[] = ['nome', 'email'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return { body: field + 'is required', statusCode: 400 };
      }
    }

    return await Promise.resolve({ body: httpRequest.body, statusCode: 201 });
  }
}
