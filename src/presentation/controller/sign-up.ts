import { MissingParamError } from '../errors/missing-param';
import { badRequest } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export interface SignUpRequest extends HttpRequest {
  body: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

export class SignUpController implements Controller {
  async execute(request: SignUpRequest): Promise<HttpResponse> {
    const requiredFields: string[] = [
      'email',
      'password',
      'passwordConfirmation',
    ];
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
    return Promise.resolve({ statusCode: 200, body: JSON.stringify(request) });
  }
}
