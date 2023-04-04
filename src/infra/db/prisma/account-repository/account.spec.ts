import { describe, expect, test } from 'vitest';
import { PrismaAccountRepository } from './account';

describe('Account In Memory Repository', () => {
  test('should return an account on success', async () => {
    const sut = new PrismaAccountRepository();
    const account = await sut.add({
      email: 'email@example.com',
      password: 'password',
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.email).toBe('email@example.com');
    expect(account.password).toBe('password');
  });
});
