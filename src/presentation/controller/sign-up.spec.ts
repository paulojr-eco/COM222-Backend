import { describe, expect, test } from 'vitest';
import { SignUpController } from './sign-up';

describe('SignUp Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
});
