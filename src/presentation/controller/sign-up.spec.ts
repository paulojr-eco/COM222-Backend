import { describe, expect, test, vi } from 'vitest';
import { AccountModel } from '../../domain/models/account';
import {
  AddAccount,
  AddAccountModel,
} from '../../domain/use-cases/add-account';
import { ServerError } from '../errors/server-error';
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

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'id',
        email: 'email@example.com',
        password: '1234567890',
      };
      return await Promise.resolve(fakeAccount);
    }
  }
  return new AddAccountStub();
};

interface SutTypes {
  sut: SignUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const addAccountStub = makeAddAccount();
  const sut = new SignUpController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
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

  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = vi.spyOn(emailValidatorStub, 'isValid');
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: '1234567890',
        passwordConfirmation: '1234567890',
      },
    };
    await sut.execute(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('email@example.com');
  });

  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    vi.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('');
    });
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: '1234567890',
        passwordConfirmation: '1234567890',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    const addAccountSpy = vi.spyOn(addAccountStub, 'add');
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: '1234567890',
        passwordConfirmation: '1234567890',
      },
    };
    await sut.execute(httpRequest);
    expect(addAccountSpy).toHaveBeenCalledWith({
      email: 'email@example.com',
      password: '1234567890',
    });
  });

  test('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    vi.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await Promise.reject(new Error(''));
    });
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: '1234567890',
        passwordConfirmation: '1234567890',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  test('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'email@example.com',
        password: '1234567890',
        passwordConfirmation: '1234567890',
      },
    };
    const httpResponse = await sut.execute(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'id',
      email: 'email@example.com',
      password: '1234567890',
    });
  });
});
