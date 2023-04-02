import { describe, expect, test, vi } from 'vitest';
import { EmailValidator } from '../protocols/email-validator';
import { SignUpController } from './sign-up';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new SignUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('SignUp Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: '1234567890',
        passwordConfirmation: '1234567890',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: email'));
  });

  test('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
        passwordConfirmation: '1234567890',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: password'));
  });

  test('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: '1234567890',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new Error('Missing param: passwordConfirmation')
    );
  });

  test('should return 400 if password and passwordConfirmation not matches', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: '1234567890',
        passwordConfirmation: '0987654321',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new Error('Invalid param: passwordConfirmation')
    );
  });

  test('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    vi.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        email: 'not-valid-email',
        password: '1234567890',
        passwordConfirmation: '1234567890',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Invalid param: email'));
  });
});
