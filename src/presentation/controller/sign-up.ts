import { InvalidParamError } from '../errors/invalid-param';
import { MissingParamError } from '../errors/missing-param';
import { badRequest } from '../helpers/http';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { HttpRequest, HttpResponse } from '../protocols/http';

export interface SignUpRequest extends HttpRequest {
  body: {
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async execute(request: SignUpRequest): Promise<HttpResponse> {
    const requiredFields: string[] = [
      'email',
      'password',
      'passwordConfirmation',
    ];
    for (const field of requiredFields) {
      if (!request.body[field as keyof SignUpRequest['body']]) {
        return badRequest(new MissingParamError(field));
      }
    }
    const { email, password, passwordConfirmation } = request.body;
    if (password !== passwordConfirmation) {
      return badRequest(new InvalidParamError('passwordConfirmation'));
    }
    const isEmailValid = this.emailValidator.isValid(email);
    if (!isEmailValid) {
      return badRequest(new InvalidParamError('email'));
    }
    return Promise.resolve({ statusCode: 200, body: JSON.stringify(request) });
  }
}
